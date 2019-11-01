const storageName = 'hex-card-database';

import { openDB } from 'idb';

export default () => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){
        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );
    } else {

        console.log( 'loaded' );

    }

    updateData();

    // Fetch database from the DB

    // If there is a stored database
    // if( database ){
    //     dispatch( setDatabase( database ) );
    // }
};

const updateData = async () => {

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

        // Fetch the actual list
        res = await fetch( dcObject.permalink_uri );
        res = await res.json();

        // NOTE can't store card list, seems like it's too big for local storage
        // localStorage.setItem( storageName, JSON.stringify( res ) );
        console.log( 'Got Database' );

        db = openDB()

    } catch ( err ){
        console.error( 'Could not fetch Bulk Data, did not update Card Database.' +
            'Error message: ', err );
    }

};