import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

Auth.configure({
    Auth:{
        mandatorySignIn: false,
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.APP_CLIENT_ID
    }
});

API.configure({
    API:{
        endpoints:[
            {
                name: "hex",
                endpoint: process.env.API_URL
            }
        ]
    }
});