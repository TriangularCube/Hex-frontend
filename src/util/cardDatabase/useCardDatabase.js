import { useSnackbar } from "notistack";

const { useState } = React;
const { useHistory, useLocation } = ReactRouterDOM;

let initialised = false;
let isUsingIDB = false;

export default () => {

    const [isLoading, updateLoading] = useState( true );

    const snackbar = useSnackbar();

    const history = useHistory();
    const location = useLocation();

    // First time this code is run, initialize the DB
    if( !initialised ){
        console.log( 'Initialize DB' );
        initializeDB( updateLoading, snackbar, history, location );

        // DEBUG
        initialised = true;
    }

    // TODO Implement interface to the DB
    const getCard = ( id ) => {

        // DEBUG
        console.log( `Trying to get card ${id}` );

    };

    return {
        isLoading,
        getCard
    }

};

const initializeDB = ( updateLoading, snackbar, history, location ) => {

    // Check IndexedDB support
    if( !('indexedDB' in window) ){
        // No indexedDB support
        console.log( 'This browser does not support IndexedDB' );

        // Redirect to Fetch Data so fetch can happen synchronously
        history.push( '/fetch-data', { referrer: location.pathname } );
        return;

    }

    // Otherwise check if web worker support exists
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



