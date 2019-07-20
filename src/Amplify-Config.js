import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

const targetName = 'Amplify-Target';

const DEV = 'dev';
const DEV_MASTER = 'dev-master';
const STAGE = 'stage';
const PROD = 'prod';

function configStage( stage ){
    switch( stage ) {
        case DEV:
            configAmplify( stage, process.env.DEV_COGNITO_USER_POOL_ID, process.env.DEV_APP_CLIENT_ID );
            break;
        case DEV_MASTER:
            configAmplify( stage, process.env.DEV_MASTER_COGNITO_USER_POOL, process.env.DEV_MASTER_APP_CLIENT_ID );
            break;
        case STAGE:
            configAmplify( stage, process.env.STAGE_COGNITO_USER_POOL, process.env.STAGE_APP_CLIENT_ID );
            break;
        case PROD:
            configAmplify( stage, process.env.PROD_COGNITO_USER_POOL, process.env.PROD_APP_CLIENT_ID );
            break;
    }
}

function configAmplify( stage, poolID, appID ){

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
                    endpoint: process.env.API_URL + stage + '/'
                }
            ]
        }
    });

    localStorage.setItem( targetName, stage );

}

export {
    targetName,
    DEV,
    DEV_MASTER,
    STAGE,
    PROD,
    configStage
}