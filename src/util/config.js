import { targetRegion, targets } from "./constants";

import { configEndpoint } from "./networkCalls";
import Auth from "@aws-amplify/auth";

export const targetName = 'Hex-API-Target';

export const setDefaultConfig = () => {

    let saved = localStorage.getItem( targetName );

    if( !saved ){
        saved = 'dev';
    }

    const targetConfigObject = Object.values(targets)
        .find( config => config.stage === saved );

    setConfig( targetConfigObject );
};

export const setConfig = ( configObject ) => {

    configAmplify( configObject );
    configEndpoint( configObject );

    localStorage.setItem( targetName, configObject.stage );

};

// Configure Amplify Library
const configAmplify = ( config ) => {

    Auth.configure({
        mandatorySignIn: false,
        region: targetRegion,
        userPoolId: config.poolId,
        userPoolWebClientId: config.appClientId
    });

};