import { targets } from "../constants";
import { configAmplify } from "./amplifyConfig";
import { configEndpoint } from "./networkCalls";

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

    console.log( configObject );

    configAmplify( configObject );
    configEndpoint( configObject );

    localStorage.setItem( targetName, configObject.stage );

};