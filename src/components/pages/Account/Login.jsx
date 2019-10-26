const {useRef} = React;

// Async Hook
import { useAsync, useAsyncCallback } from "react-async-hook";

// Router
import { Link as RouterLink } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Amp
import networkCalls from "../../../util/networkCalls";

// Material UI utils
import { makeStyles } from "@material-ui/styles";

// Material UI
import {Typography, TextField, Container, Avatar, Button, CircularProgress as Progress, Link} from "@material-ui/core";

// Icons
import { LockOutlined } from "@material-ui/icons";


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
    },
    submit: {
        margin: theme.spacing( 2, 0, 1 ),
        height: 50 // This should be the height of the Progress Indicator
    },
    linkSection: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    spacer: {
        flex: 1
    }

}));

const Login = ( props ) => {

    // DEBUG Log if referred from somewhere
    if( props.location.state && props.location.state.referrer ){
        console.log( `Login referred from ${props.location.state.referrer}` )
    }

    // Refs for inputs
    const emailRef = useRef(null );
    const passwordRef = useRef( null );

    // Check the Login Status
    const fetchingUser = useAsync( networkCalls.FetchUserData, [] );

    // Check if user is already logged in
    const user = useSelector( state => state.user );

    // Setup Async Login Handlers
    const login = async () => {
        const res = await networkCalls.Login( emailRef.current.value, passwordRef.current.value );

        if( res.success ){
            // If login is successful, redirect

            if( props.location.state && props.location.state.referrer ){
                props.history.push( props.location.state.referrer );
                return;
            }

            props.history.push( '/' );
        } else {
            // Otherwise, print the error
            // TODO
            console.log( `Login Unsuccessful, message: ${res.error}` );
        }

        // DEBUG
        // console.log( "enter" );
        // await new Promise( resolve => setTimeout( resolve, 2000 ) );
        // console.log( "resolve" );
    };
    const asyncLogin = useAsyncCallback( login );
    const handleSubmit = ( event ) => {
        event.preventDefault();
        asyncLogin.execute();
    };

    // Set the styles
    const classes = useStyles();

    // If we're checking login status, render Progress Activity
    if( fetchingUser.loading ){
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

    // TODO implement error banner

    return(
        <Container maxWidth='xs'>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
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
                        inputRef={passwordRef}
                        variant='filled'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        // variant='contained'
                        className={classes.submit}
                        // onClick={asyncLogin.execute}
                        disabled={asyncLogin.loading}
                    >
                        {
                            asyncLogin.loading ?
                            <Progress/>
                            : "Login"
                        }
                    </Button>
                </form>

                <div className={classes.linkSection}>

                    <Link varient='body2' component={RouterLink} to='/forgotPassword'>
                        Forgot password?
                    </Link>

                    <div className={classes.spacer}/>

                    <Link varient='body2' component={RouterLink} to='/createAccount'>
                        Create a new account
                    </Link>

                </div>
            </div>
        </Container>
    )

};

export default Login;