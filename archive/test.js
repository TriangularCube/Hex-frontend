import React from "react";

// Material UI
import Button from "@material-ui/core/Button";

// AWS
import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";
import {useSelector} from "react-redux";


async function CreateUser(){
    try{
        const user = await Auth.signUp({
            username: 'michael.liu0@gmail.com',
            password: 'this is a very long password',
            attributes: {
                name: 'bluntweapon'
            }
        });
        console.log( user );
    } catch( e ){
        console.log( e.message );
    }
}

async function LoginUser(){

    try {
        const user = await Auth.signIn( 'michael.liu0@gmail.com', 'this is a very long password' );
        console.log( user );
    } catch( e ){
        console.log( e.message );
    }


    /*
    cognitoUser.authenticateUser( authenticationDetails, {
        onSuccess: result => {
            console.log( result );
        } ,

        onFailure: err => {
            console.log( err.message || JSON.stringify( err ) );
        }
    });
    */
}

function GetCurrent(){
    Auth.currentAuthenticatedUser()
        .then( data => console.log( data ) )
        .catch( err => console.log( err ) );
}

async function ConfirmSignup(){
    try{
        const output = await Auth.confirmSignUp( 'michael.liu0@gmail.com', '112284' );
        console.log( output );
    } catch( e ){
        console.log( e.message );
    }
}

function Logout(){
    Auth.signOut()
        .then( data => console.log( data ) )
        .catch( err => console.log( err ) );
}

async function CallAPI(){

    let token;
    try{
        const user = await Auth.currentAuthenticatedUser();
        token = user.getSignInUserSession().getIdToken().getJwtToken();
    } catch( e ){
        token = 'none';
    }

    try{
        const res = await API.get( "hex", "user/bluntweapon", {
            headers: {
                Authorization: token
            }
        } );
        console.log( res );
    } catch( e ){
        console.log( e.message );
    }

}

async function ForgotPassword(){
    try{
        const res = await Auth.forgotPassword( 'michael.liu0@gmail.com' );
        console.log( res );
    } catch( e ){
        console.log( e.message );
    }
}

async function ChangePassword(){
    try{
        const res = await Auth.forgotPasswordSubmit( 'michael.liu0@gmail.com', '804910', 'this is the grand life' );
        console.log( res );
    } catch( e ){
        console.log( e.message );
    }
}

function Test(){

    const user = useSelector( state => state.user );
    console.log( user );

    return(
        <div>
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
            <Button onClick={ CallAPI }>
                Call API
            </Button>
            <Button onClick={ ForgotPassword }>
                Forgot Password!
            </Button>
            <Button onClick={ ChangePassword }>
                Change Password
            </Button>
        </div>
    );
}

export default Test;