export let isUsingIDB = false;
export let idbLoading = true;

export default ( snackbar ) => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){
        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );

        // TODO Use other ways to keep DB around
        // NOTE Maybe we won't use a local database then?

    } else {

        // There is IndexedDB Support
        isUsingIDB = true;

        updateData( snackbar );
    }

    // TODO

};

const updateData = ( snackbar ) => {

    if( typeof( Worker ) !== 'undefined' ){
        // We have access to Web Worker!
        console.log( 'Updating DB with worker!' );
        updateUsingWebWorker( snackbar );
    } else {
        // No web workers, have to use another method
        console.log( 'No access to web workers. NOT IMPLEMENTED.')

        // TODO
    }

};

const updateUsingWebWorker = ( snackbar ) => {

    // Make worker
    const worker = new Worker( './updateDBWorker.js' );

    let snackKey;

    worker.onmessage = ( event ) => {
        const msg = event.data;

        switch ( msg.message ) {
            case 'error':
                snackbar.enqueueSnackbar( 'Error updating Database' );
                break;
            case 'canBeUsed':
                idbLoading = false;
                break;
            case 'noUpdate':
                snackbar.enqueueSnackbar( 'No Database Update Needed' );
                break;
            case 'updating':
                snackKey = snackbar.enqueueSnackbar( 'Database Updating' );
                break;
            case 'finished':
                snackbar.closeSnackbar( snackKey );
                snackbar.enqueueSnackbar( 'Database Updated' );
                break;
        }
    };

    worker.postMessage( { action: 'update' } );

};

// TODO Implement interface to the DB