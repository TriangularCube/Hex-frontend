import React, {useEffect, useMemo, useState} from "react";
import ReactDOM from "react-dom";

// Redux
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./Redux/store";
import { setDrawer } from "./Redux/actionCreators";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material UI utils
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/styles";
import {Container, Typography, useMediaQuery} from "@material-ui/core";

// Material UI Components
import { CircularProgress, CssBaseline } from "@material-ui/core";

// Loadable
import loadable from "@loadable/component";

// Hex components
import MenuDrawer from "./MenuDrawer";
import NavBar from "./NavBar";

const Splash = loadable( () => import( "./components/pages/Splash/Splash" ) );
const Login = loadable( () => import( "./components/pages/Account/Login" ) );
const MyCubes = loadable( () => import( "./components/pages/MyCubes/MyCubes" ) );
const Target = loadable( () => import( "./components/pages/TargetSelect/Target" ) );

// Font
WebFont.load({
    google: {
        families: [ 'Roboto:300,500,700' ]
    }
});

// Configure Amplify
import { targetName, configStage, DEV } from "./util/amplify/Amplify-Config";
const target = localStorage.getItem( targetName );
configStage( target === null ? DEV : target );

// Amplify
import { GetUser } from "./util/amplify/amp";

// Load Theme
import DefaultThemeObject from "./util/DefaultTheme";
const defaultTheme = createMuiTheme( DefaultThemeObject );

// Get Page Width
import { pageWidth, sidePadding } from "./util/constants";


// Make styles
const useStyles = makeStyles( theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    progressCentering: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    pageContainer: {
        // backgroundColor: '#382fff',
        // maxWidth: pageWidth,
        // height: '100%',
        margin: `24px auto`,
        padding: `0 ${sidePadding}px`
    },
    footer: {
        padding: theme.spacing( 1 ),
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper
    }
}));


// The inner most Component, after all the context is passed through
const WithTheme = () => {

    // Get style classes
    const classes = useStyles();

    // Is the app prepping?
    const [isPrepping, setPrepping] = useState(true );

    // Prep data and such
    useEffect( () => {

        // Wrapped in an Async Function
        const Effect = async () => {
            // Figure out if the user is logged in
            await GetUser();

            // Finally, we're done prepping
            setPrepping(false );
        };

        // Ignoring the Promised returned since it can never error out
        Effect();

    }, [] );

    // Bail early if we're prepping
    if( isPrepping ){
        return (
            <div className={classes.progressCentering}>
                <CircularProgress/>
            </div>
        );
    }

    // Otherwise, render page
    return (
        <div className={ classes.root }>
            <Router>
                <MenuDrawer />
                <NavBar/>
                <Container component='main' className={classes.pageContainer}>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/myCubes' component={MyCubes} />
                        <Route path='/target' component={Target} />
                        <Route exact path='/' component={Splash} />
                    </Switch>
                </Container>
                <footer className={ classes.footer }>
                    <Typography variant='body1' color='inherit'>
                        This is a footer
                    </Typography>
                </footer>
            </Router>
        </div>
    );

};

const WithStore = () => {

    // Figure out what theme to use

    // Grab the user from Redux
    const user = useSelector( state => state.user );

    // Use the user's custom theme if there is one
    const useTheme = user && user.theme ?
        // Memoize the user's theme to minimize having to create a new theme every time
        useMemo( () => createMuiTheme( user.theme ), [user.theme] ) :
        // Otherwise just use the default theme
        defaultTheme;

    return(
        <ThemeProvider theme={ useTheme }>
            <CssBaseline/>
            <WithTheme/>
        </ThemeProvider>
    );

};

const App = () => {
    return(
        <Provider store={store}>
            <WithStore/>
        </Provider>
    );
};

ReactDOM.render( <App />, document.getElementById( 'root' ) );