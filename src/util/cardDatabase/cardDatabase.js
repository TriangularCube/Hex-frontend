import networkCalls from "../networkCalls";

let initialised = false;
let loading = true;
let useIDB = false;


// TODO Implement interface to the DB
export const getCard = ( id ) => {

    // DEBUG
    console.log( `Trying to get card ${id}` );

};

// NOTE Searching through IndexedDB is VERY slow
// Going to default to Sryfall Search for now
// TODO Implement offline search
export const searchUsingTerm = async ( abortSignal, term ) => {

    // Extra precaution
    if( term.length < 1 ){
        return null;
    }

    console.log( 'Searching term ', term );

    const res = await networkCalls.SearchCard( term, abortSignal );

    if( !res.success ){
        console.error( 'Error getting cards from Scryfall', res.error );
        return [];
    }

    console.log( 'Search returned: ', res.result );

    return res.result.data;

};

export const initializeDB = () => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){

        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );
        return;

    }

    // Otherwise check if web worker support exists
    if( typeof( Worker ) !== 'undefined' ){
        // We have access to Web Worker!
        console.log( 'Updating DB with worker!' );
        updateUsingWebWorker();
    } else {
        // TODO No web workers, have to use another method
        console.warn( 'No access to web workers. UPDATE NOT IMPLEMENTED.');
    }

};
const updateUsingWebWorker = () => {

    // Make worker
    const worker = new Worker(
        './updateDBWorker.js',
        // https://github.com/GoogleChromeLabs/worker-plugin/issues/43
        { name: 'UpdateDB', type: "module" }
    );

    let snackKey;

    worker.onmessage = ( event ) => {
        const msg = event.data;

        switch ( msg.message ) {
            case 'error':

                // We errored, so leave IDB to false and just use web API

                loading = false;
                console.error( 'Error updating Database. Using web API' );

                break;
            case 'canBeUsed':

                // DB can be used even if it's updating
                loading = false;
                useIDB = true;
                break;

            case 'noUpdate':

                // No need to update
                loading = false;
                useIDB = true;
                console.log( 'No Database Update Needed' );

                break;

            case 'updating':

                // Currently updating the DB
                console.log( 'Database Updating' );
                break;

            case 'finished':

                // Finally finished initialising
                loading = false;
                useIDB = true;
                console.log( 'Database Update Complete' );

                return;
        }
    };

    worker.postMessage( { action: 'update' } );

};



