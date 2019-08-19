import React, {useMemo} from "react";
import ReactDOM from "react-dom";

import { useAsync } from "react-async-hook";

// Redux
import {Provider, useSelector} from "react-redux";
import store from "./Redux/store";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material UI utils
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import {Container, Typography} from "@material-ui/core";

// Material UI Components
import { CssBaseline } from "@material-ui/core";

// Loadable
import loadable from "@loadable/component";

// Hex components
import MenuDrawer from "./MenuDrawer";
import NavBar from "./NavBar";

const Splash = loadable( () => import( "./components/pages/Splash/Splash" ) );
const Login = loadable( () => import( "./components/pages/Account/Login" ) );
const MyCubes = loadable( () => import( "./components/pages/MyCubes/MyCubes" ) );
const Target = loadable( () => import( "./components/pages/TargetSelect/Target" ) );

import PageLoading from "./components/common/PageLoading";

// HACK strictly for debugging
import Test from "../archive/test";

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
import amp from "./util/amplify/amp";

// Load Theme
import defaultThemeObject from "./util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Get Page Width
import { sidePadding } from "./util/constants";


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
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
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

    const asyncUser = useAsync( amp.FetchUser, [] );

    // Bail early if we're prepping
    if( asyncUser.loading ){
        // TODO Write something quipy here
        return (
            <div className={ classes.root }>
                <PageLoading/>
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
                        <Route path='/test' component={Test}/>

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