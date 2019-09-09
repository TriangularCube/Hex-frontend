import Auth from "@aws-amplify/auth";
import { targetRegion } from "../constants";

export const configAmplify = ( config ) => {

    Auth.configure({
        mandatorySignIn: false,
        region: targetRegion,
        userPoolId: config.poolId,
        userPoolWebClientId: config.appClientId
    });

};