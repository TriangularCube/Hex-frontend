import React, { useEffect } from "react";

// Material UI
import Button from "@material-ui/core/Button";

// AWS
import Amplify from "aws-amplify";
const Auth = Amplify.Auth;

async function CreateUser( username, password ){
    try{
        const user = await Auth.signUp({
            username: 'bluntweapon',
            password: 'this is the grand life',
            attributes: {
                email: 'michael.liu0@gmail.com'
            }
        });
        console.log( user );
    } catch( e ){
        console.log( e.message );
    }

}

async function LoginUser(){
    try{
        const user = await Auth.signIn( 'bluntweapon', 'this is the grand life' );
        console.log( user );
    } catch( e ){
        console.log( e.message );
    }
}

async function GetCurrent(){
    const user = await Auth.currentAuthenticatedUser({
        bypassCache: true
    });
    console.log( user );
}

function Login(){

    return(
        <>
            <Button onClick={ CreateUser }>
                Create User!
            </Button>
            <Button onClick={ LoginUser }>
                Login!
            </Button>
            <Button onClick={ GetCurrent }>
                Show Current User
            </Button>
        </>
    );
}

export default Login;