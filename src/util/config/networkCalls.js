import Auth from "@aws-amplify/auth";

import errorCodes from "../errorCodes.json";

import store from "../../Redux/store";
import { setUser } from "../../Redux/actionCreators";

const dispatch = store.dispatch;

let endpoint;
export const configEndpoint = ( config ) => {
    endpoint = config.url;
};



//region GET logic
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
    console.log( `GET on path: ${path} ${ token ? 'with token' : '' }` );

    try{

        const res = await fetch( endpoint + path, {
            headers: {
                Authorization: token,
                ...additionalHeaders
            },
            mode: "cors"
        });

        if( !res.ok ){
            return {
                success: false,
                error: res
            }
        }

        return await res.json();

    } catch( e ){
        return {
            success: false,
            error: e
        };
    }

};
//endregion

const Post = async ( path, body, additionalHeaders = {} ) => {

    const token = await GetUserCredentials();

    // If not logged in, punt it back
    if( !token ){

        // DEBUG
        console.error( 'Cannot POST without being logged in' );

        return {
            success: false,
            error: errorCodes.notLoggedIn
        };
    }

    console.log( `POST on path: ${path}` );

    try{

        const res = await fetch( endpoint + path, {
            method: 'POST',
            headers: {
                Authorization: token,
                ...additionalHeaders
            },
            body: JSON.stringify( body )
        });

        if( !res.ok ){
            return {
                success: false,
                error: res
            }
        }

        return await res.json();

    } catch( e ){

        return {
            success: false,
            error: e
        }

    }

};

//region Convenience functions
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
//endregion

//region Scryfall

const SearchCard = async ( query, abortSignal, page = 1 ) => {

    try {

        const res =
            await fetch( `https://api.scryfall.com/cards/search?q=${query}&page=${page}` );

        if( !res.ok ){
            return {
                success: false,
                error: res
            }
        }

        const json = await res.json();

        return {
            success: true,
            result: json
        };

    } catch ( e ){

        console.error( 'Error searching cards from Scryfall, message: ' + e.message );
        return undefined;

    }

};

//endregion



//region User Account Management
const CreateUser = async ( name, pws ) => {

};

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
    FetchUserData,
    Get,
    GetWithAuth,
    Post,
    SearchCard,
    Login,
    Logout
}