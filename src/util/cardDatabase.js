const dbName = 'hex-database';
const storeName = 'hex-cards';
const version = 1;
const lastUpdatedKeyName = 'last-updated';

import { openDB } from 'idb';

let isUsingIDB = false;
let idbLoading = true;

export default () => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){
        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );
        // TODO Use other ways to keep DB around
    } else {
        isUsingIDB = true;
        updateData();
    }

    // TODO

};

const updateData = async () => {

    // TODO Add backup handlers in case this operation fails

    try {
        // Try to fetch the latest database
        let res = await fetch( 'https://api.scryfall.com/bulk-data' );

        res = await res.json();

        // Only fetch Default Cards collection
        const dcObject = res.data.find( element => element.name === 'Default Cards' );

        if( !dcObject ){
            // Error
            console.error( 'Cannot find the Default Cards entry' );
            return;
        }

        const updatedAt = new Date( dcObject.updated_at );
        console.log( 'Bulk Data updated at', updatedAt );


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
            /*
            blocked:
            blocking:
            */
        });

        // See if there's already data in it
        const dbUpdatedAt = await db.get( storeName, lastUpdatedKeyName );
        console.log( 'DB Updated at', dbUpdatedAt );

        // If there already exists some data
        if( dbUpdatedAt ){
            // Let the rest of the app load and not hang on this
            idbLoading = false;
        }

        // If data is not newer
        if( dbUpdatedAt && dbUpdatedAt >= updatedAt ){
            console.log( 'DB doesn\'t need an update' );
            return;
        }

        console.log( 'Fetching Bulk Data' );

        // Fetch the actual list
        res = await fetch( dcObject.permalink_uri );
        res = await res.json();

        console.log( 'Updating DB' );

        const tx = db.transaction( storeName, 'readwrite' );
        tx.store.put( updatedAt, lastUpdatedKeyName );
        res.map( element => {
            tx.store.put( element, element.id );
        });
        await tx.done;

        console.log( 'Done update' );

    } catch ( err ){
        console.error( 'Could not update Card Database.' +
            'Error message: ', err.message );
    }

};

// TODO Implement interface to the DB