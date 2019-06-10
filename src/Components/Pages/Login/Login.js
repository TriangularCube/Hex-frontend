import React, { useEffect } from "react";

// Material UI
import Button from "@material-ui/core/Button";

// AWS
import Auth from "@aws-amplify/auth";

async function CreateUser(){
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

function GetCurrent(){
    Auth.currentAuthenticatedUser({
        bypassCache: true
    })
        .then( user => console.log( user ) )
        .catch( err => console.log( err ) );
}

async function ConfirmSignup(){
    try{
        const data = await Auth.confirmSignUp( 'bluntweapon', '596234' );
        console.log( data );
    } catch( e ){
        console.log( e.message );
    }
}

function Logout(){
    Auth.signOut()
        .then( () => console.log( "Successfully logged out" ) )
        .catch( err => console.log( err ) );
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
            <Button onClick={ ConfirmSignup }>
                Confirm Signup
            </Button>
            <Button onClick={ Logout }>
                Logout
            </Button>
        </>
    );
}

export default Login;