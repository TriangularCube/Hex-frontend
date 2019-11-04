import { useSnackbar } from "notistack";

const { useState, useEffect } = React;

export default () => {

    const [isLoading, updateLoading] = useState( true );
    const [isUsingIDB, updateUsingIDB] = useState( false );

    const snackbar = useSnackbar();

    // First time this code is run, initialize the DB
    useEffect( () => {
        initializeDB( updateLoading, updateUsingIDB, snackbar );
    }, [] );

    // TODO Implement interface to the DB
    const getCard = ( id ) => {

        // DEBUG
        console.log( `Trying to get card ${id}` );

    };

    return {
        isLoading,
        isUsingIDB,
        getCard
    }

};

const initializeDB = ( updateLoading, updateUsingIDB, snackbar ) => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){
        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );

        // TODO Use other ways to keep DB around
        // NOTE Maybe we won't use a local database then?

        fetchWithoutIDB();

        return;

    }

    // There is IndexedDB Support
    updateUsingIDB( true );

    if( typeof( Worker ) !== 'undefined' ){
        // We have access to Web Worker!
        console.log( 'Updating DB with worker!' );
        updateUsingWebWorker( updateLoading, snackbar );
    } else {
        // No web workers, have to use another method
        console.log( 'No access to web workers. NOT IMPLEMENTED.')
    }


    // NOTE This is wrong
    // updateLoading( false );
    // TODO
};

const fetchWithoutIDB = () => {

};

const updateUsingWebWorker = ( updateLoading, snackbar ) => {

    // Make worker
    const worker = new Worker( './updateDBWorker.js' );

    let snackKey;

    worker.onmessage = ( event ) => {
        const msg = event.data;

        switch ( msg.message ) {
            case 'error':
                updateLoading( false );
                snackbar.enqueueSnackbar( 'Error updating Database' );
                break;
            case 'canBeUsed':
                updateLoading( false );
                break;
            case 'noUpdate':
                updateLoading( false );
                snackbar.enqueueSnackbar( 'No Database Update Needed' );
                break;
            case 'updating':
                snackKey = snackbar.enqueueSnackbar( 'Database Updating' );
                break;
            case 'finished':
                updateLoading( false );
                snackbar.closeSnackbar( snackKey );
                snackbar.enqueueSnackbar( 'Database Updated' );
                return;
        }
    };

    worker.postMessage( { action: 'update' } );

};



