import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

import store from "../../Redux/store";
import { setUser } from "../../Redux/actionCreators";

const dispatch = store.dispatch;

const FetchUser = async () => {

    try{

        const user = await Get( '/me' );

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

const Get = async ( path, additionalHeaders = {} ) => {

    // Get the user auth token
    let user;
    try{
        user = await Auth.currentSession();
    } catch( e ){
        // DEBUG
        console.log( `Not Authenticated: ${e}` );
    }

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
    Login,
    Logout
}