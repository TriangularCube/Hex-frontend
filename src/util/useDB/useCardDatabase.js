let initialised = false;

import { open } from "./dbUtil";

export default () => {

    // First time this code is run, initialize the DB
    if( !initialised ){
        console.log( 'Initialise DB' );
        updateUsingWebWorker();

        // DEBUG
        initialised = true;
    }

    return {
        isLoading: true
    }

};

const updateUsingWebWorker = () => {

    // Make worker
    const worker = new Worker( './updateDBWorker.js' );

    worker.postMessage( { action: 'update' } );

};



