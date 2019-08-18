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

        // Not logged in
        dispatch( setUser( null ) );

    }

};

const Get = async ( path, additionalHeaders = {} ) => {

    // Get the user auth token
    const user = await Auth.currentAuthenticatedUser();
    const token = user ? user.getSignInUserSession().getIdToken().getJwtToken() : 'none';

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

        await Auth.signIn( name, pwd );
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