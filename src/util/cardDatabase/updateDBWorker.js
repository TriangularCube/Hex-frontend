import { dbName, storeName, version, lastUpdatedKeyName } from "./constants";
import { openDB } from 'idb';

// Take incoming messages
onmessage = (e) => {
    const cmd = e.data;

    switch ( cmd.action ) {
        case 'update':
            update();
            break;
        default:
            console.log( 'Worker received action ' + cmd.action );
            break;
    }
};

const update = async () => {
    try {
        // Try to fetch the latest database
        let res = await fetch( 'https://api.scryfall.com/bulk-data' );

        res = await res.json();

        // Only fetch Default Cards collection
        const dcObject = res.data.find( element => element.name === 'Default Cards' );

        if( !dcObject ){
            // Error
            postMessage( { message: 'error' } );
            self.close();
            return;
        }

        const updatedAt = new Date( dcObject.updated_at );
        console.log( 'WORKER: Bulk Data updated at', updatedAt );

        // Open the DB
        const db = await openDB( dbName, version, {
            upgrade: (db, lastVersion) => {
                switch( lastVersion ){
                    case 0:
                        const store = db.createObjectStore( storeName );

                        store.createIndex( 'name', 'name' );
                        break;
                    case 1:
                        // NOTE This isn't needed at the moment
                        break;
                }
            },
            // blocked:
            // blocking:
        });

        // See if there's already data in it
        const dbUpdatedAt = await db.get( storeName, lastUpdatedKeyName );
        console.log( 'WORKER: DB Updated at', dbUpdatedAt );

        // If there already exists some data
        if( dbUpdatedAt ){
            // Let the rest of the app load and not hang on this
            postMessage( { message: 'canBeUsed' });
        }

        // If data is not newer
        if( dbUpdatedAt && dbUpdatedAt >= updatedAt ){
            postMessage( { message: `noUpdate` });

            // Close the worker
            self.close();
            return;
        }

        postMessage( { message: 'updating' } );

        // Fetch the actual list
        // NOTE This is LARGE, so it takes a while
        res = await fetch( dcObject.permalink_uri );
        res = await res.json();

        console.log( 'WORKER: Fetch complete, injecting into DB' );

        // Open a transaction to save it all to the DB
        const tx = db.transaction( storeName, 'readwrite' );

        // Update the Time
        tx.store.put( updatedAt, lastUpdatedKeyName );

        // Save all elements
        res.map( element => {
            tx.store.put( element, element.id );
        });

        // Wait for the transaction to be done
        await tx.done;

        postMessage( { message: 'finished' } );

    } catch( err ){
        console.error( 'WORKER: Could not update Card Database.' +
            'Error message: ', err.message );
        postMessage( { message: 'error' } );
    }

    // Close this worker
    self.close();
};
