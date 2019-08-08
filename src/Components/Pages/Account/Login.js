import React, {useEffect, useState} from "react";

// Redux
import { useSelector } from "react-redux";

// Amp
import amp from "../../../util/amplify/amp";

// Material UI utils
import { makeStyles } from "@material-ui/styles";

// Material UI
import {Typography, TextField, Container, Avatar, Button} from "@material-ui/core";

// Icons
import { LockOutlined } from "@material-ui/icons";

// Hex
import PageTitle from "../../Common/PageTitle";

// Styles
const useStyles = makeStyles(theme => ({

    container: {
        marginTop: theme.spacing( 8 ),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main
    }

}));

const Login = () => {

    const classes = useStyles();

    // Check the Login Status
    const [checkingUser, setCheckingUser] = useState( true );
    useEffect( () => {
        amp.GetUser().then( () => {
            setCheckingUser( false );
        });
    }, [] );

    // Check if user is already logged in
    const user = useSelector( state => state.user );

    // If we're checking login status, render Progress Activity
    if( checkingUser ){
        // TODO Render Progress
        return(
            <Typography>
                Checking
            </Typography>
        )
    }



    // Bail out early if already logged in
    if( user !== null ){
        // TODO instead redirect to splash
        return (
            <Typography>Logged in</Typography>
        )
    }

    const emailRef = React.createRef();

    const handleSubmit = async ( event ) => {
        console.log( emailRef.current.value );
        event.preventDefault();
    };

    return(
        <Container maxWidth='xs'>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <TextField
                        fullWidth={true}
                        margin='normal'
                        label='Email Address'
                        type='email'
                        name='email'
                        id='email'
                        inputRef={emailRef}
                        variant='filled'
                    />
                    <TextField
                        fullWidth={true}
                        margin='normal'
                        label='Password'
                        type='password'
                        variant='filled'
                    />
                    <Button
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    )

};

export default Login;