import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

const targetName = 'Amplify-API-Target';

const LOCAL = 'local';
const DEV = 'dev';
const DEV_MASTER = 'dev-master';
const STAGE = 'stage';
const PROD = 'prod';

function configStage( stage ){
    switch( stage ) {
        case LOCAL:
            configAmplify( '', 'http://localhost:3000', process.env.DEV_COGNITO_USER_POOL_ID, process.env.DEV_APP_CLIENT_ID );

            // To counteract the input of empty string into above
            localStorage.setItem( targetName, stage );
            break;
        case DEV:
            configAmplify( stage, process.env.API_URL, process.env.DEV_COGNITO_USER_POOL_ID, process.env.DEV_APP_CLIENT_ID );
            break;
        case DEV_MASTER:
            configAmplify( stage, process.env.API_URL, process.env.DEV_MASTER_COGNITO_USER_POOL, process.env.DEV_MASTER_APP_CLIENT_ID );
            break;
        case STAGE:
            configAmplify( stage, process.env.API_URL, process.env.STAGE_COGNITO_USER_POOL, process.env.STAGE_APP_CLIENT_ID );
            break;
        case PROD:
            configAmplify( stage, process.env.API_URL, process.env.PROD_COGNITO_USER_POOL, process.env.PROD_APP_CLIENT_ID );
            break;
    }
}

function configAmplify( stage, apiURL, poolID, appID ){

    Auth.configure({
        mandatorySignIn: false,
        region: process.env.COGNITO_REGION,
        userPoolId: poolID,
        userPoolWebClientId: appID
    });

    API.configure({
        API:{
            endpoints:[
                {
                    name: 'hex',
                    endpoint: apiURL + stage + '/'
                }
            ]
        }
    });

    localStorage.setItem( targetName, stage );

}

export {
    targetName,
    LOCAL,
    DEV,
    DEV_MASTER,
    STAGE,
    PROD,
    configStage
}