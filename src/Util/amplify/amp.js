import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

import store from "../../Redux/store";
import { setUser } from "../../Redux/actionCreators";

const dispatch = store.dispatch;

export const GetUser = async () => {

    try{

        // Fetch the current user from Auth
        const res = await Auth.currentAuthenticatedUser();

        // TODO get user data
        // res.getSignInUserSession().getIdToken().getJwtToken();

        dispatch( setUser( res ) );

    } catch( e ){

        // Not logged in
        dispatch( setUser( null ) );

    }

};

const Get = async ( path, additionalHeaders = {} ) => {

    // Get the user auth token
    const user = await GetUser();
    const token = user ? user.getSignInUserSession().getIdToken().getJwtToken() : 'none';

    try{

        return await API.get( 'hex', path, {
            headers: {
                Authorization: token,
                ...additionalHeaders
            }
        });

    } catch( e ){
        console.log( `ERROR, ${e.message}` );
        return undefined;
    }

};

const CreateUser = async ( name, pws ) => {

};

const Login = async ( name, pwd ) => {

    try{

        await Auth.signIn( name, pwd );

        return true;

    } catch( e ){

        console.log( e );
        return false;

    }

};

const Logout = async () => {

    try{
        await Auth.signOut();
        return true;
    } catch( e ){
        console.log( e );
        return false;
    }

};

export default {
    GetUser,
    Get,
    Login,
    Logout
}