import { setDatabase } from "../redux/actionCreators";

import store from "../redux/store";
const dispatch = store.dispatch;

const storageName = 'hex-card-database';

export default async () => {

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
        if( res.data[0].name === 'Default Cards' ){

            // Fetch the actual list
            res = await fetch( res.data[0].permalink_uri );
            res = await res.json();

            // NOTE can't store card list, seems like it's too big for local storage
            // localStorage.setItem( storageName, JSON.stringify( res ) );
            console.log( 'Got Database' );
            dispatch( setDatabase( res ) );

        }
    } catch ( err ){
        console.error( 'Could not fetch Bulk Data, did not update Card Database.' +
            'Error message: ', err );
    }

};