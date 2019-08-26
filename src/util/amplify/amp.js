import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

import errorCodes from "../../util/errorCodes.json";

import store from "../../Redux/store";
import { setUser } from "../../Redux/actionCreators";

const dispatch = store.dispatch;

const FetchUserData = async () => {

    try{

        const user = await GetWithAuth( '/me' );

        if( user.success ){
            dispatch( setUser( user.user ) );
            return user.user;
        }

        dispatch( setUser( null ) );

    } catch( e ){

        // DEBUG
        console.error( 'Fetch User Errored, setting user to Null. Message: ' + e );

        // Not logged in
        dispatch( setUser( null ) );

    }

};

// Fetch user credentials from Auth module
const GetUserCredentials = async () => {

    let userCredentials;
    try{

        userCredentials = await Auth.currentSession();

        // If successful, get JWT
        return userCredentials.getIdToken().getJwtToken();

    } catch( e ){

        // DEBUG
        console.log( `Error getting user credentials from Auth, setting user to Null. Message: ${ e.message }` );

        // If unsuccessful, reset user and return
        dispatch( setUser( null ) );

        return undefined;

    }

};

const GetWithAuth = async ( path, additionalHeaders = {} ) => {

    let token = await GetUserCredentials();

    if( !token ) {

        return {
            success: false,
            error: errorCodes.notLoggedIn
        }

    }

    return await GetFromServer( path, token, additionalHeaders );

};

const Get = async ( path, additionalHeaders = {} ) => {

    let token = await GetUserCredentials();

    if( !token ){
        token = 'none';
    }

    return await GetFromServer( path, token, additionalHeaders );

};

const GetFromServer = async ( path, token, additionalHeaders ) => {

    // DEBUG
    console.log( `GET on path: ${path},\nusing token: ${token}` );

    try{

        return await API.get( 'hex', path, {
            headers: {
                Authorization: token,
                ...additionalHeaders
            }
        });

    } catch( e ){
        return {
            success: false,
            error: e.message
        };
    }

};

const CreateUser = async ( name, pws ) => {

};


//region Login/out
const Login = async ( name, pwd ) => {

    try{

        const res = await Auth.signIn( name, pwd );
        console.log( res );
        await FetchUserData();

        return {success: true};

    } catch( e ){

        return {
            success: false,
            error: e
        };

    }

};

const Logout = async () => {

    try{
        await Auth.signOut();
        dispatch( setUser( null ) );
        return { success: true };
    } catch( e ){
        return {
            success: false,
            error: e.message
        };
    }

};
//endregion

export default {
    FetchUser: FetchUserData,
    Get,
    GetWithAuth,
    Login,
    Logout
}