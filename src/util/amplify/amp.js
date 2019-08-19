import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

import errorCodes from "../../util/errorCodes.json";

import store from "../../Redux/store";
import { setUser } from "../../Redux/actionCreators";

const dispatch = store.dispatch;

const FetchUser = async () => {

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

const GetWithAuth = async ( path, additionalHeaders = {} ) => {

    let user;
    try{
        user = await Auth.currentSession();
    } catch( e ){
        console.log( 'Not Authenticated' );
        return {
            success: false,
            error: errorCodes.notLoggedIn
        }
    }

    return await GetFromServer( path, user, additionalHeaders );

};

const Get = async ( path, additionalHeaders = {} ) => {

    // Get the user auth token
    let user;
    try{
        user = await Auth.currentSession();
    } catch( e ){
        // DEBUG
        console.log( `Not Authenticated: ${e}` );
    }

    return await GetFromServer( path, user, additionalHeaders )

};

const GetFromServer = async ( path, user, additionalHeaders ) => {

    const token = user ? user.getIdToken().getJwtToken() : 'none';

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
        await FetchUser();

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
    FetchUser,
    Get,
    GetWithAuth,
    Login,
    Logout
}