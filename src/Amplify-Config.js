import Amplify from "aws-amplify";

Amplify.configure({
    Auth:{
        mandatorySignIn: false,
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.APP_CLIENT_ID
    }
});