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
import { Typography } from "@material-ui/core";

// Material UI Components
import { CssBaseline } from "@material-ui/core";

// Loadable
import loadable from "@loadable/component";

//region Hex components
import MenuDrawer from "./MenuDrawer";
import NavBar from "./NavBar";

const Target = loadable( () => import( "./components/pages/TargetSelect/Target" ) );

const Splash = loadable( () => import( "./components/pages/Splash/Splash" ) );
const Login = loadable( () => import( "./components/pages/Account/Login" ) );
const MyCubes = loadable( () => import( "./components/pages/MyCubes/MyCubes" ) );
const ViewCubePage = loadable( () => import( "./components/pages/Cube/Cube" ) );
const EditCubePage = loadable( () => import( "./components/pages/Cube/CubeEdit" ) );
//endregion

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
import { setDefaultConfig } from "./util/config/config";
setDefaultConfig();

// Amplify
import networkCalls from "./util/networkCalls";

// Load Theme
import defaultThemeObject from "./util/defaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Load card database
import loadCardDatabase from "./util/cardDatabase";
loadCardDatabase();


// Make styles
const useStyles = makeStyles( theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
        minHeight: '100vh'
    },
    siteContent: {
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: theme.spacing( 2 )
    },
    footer: {
        padding: theme.spacing( 1 ),
        // marginTop: 'auto',
        justifySelf: 'flex-end',
        backgroundColor: theme.palette.background.paper
    }
}));


// The inner most Component, after all the context is passed through
const WithTheme = () => {

    // Get style classes
    const classes = useStyles();

    // Otherwise, render page
    return (
        <div className={ classes.root }>
            <Router>
                <MenuDrawer />
                <NavBar/>

                <main className={classes.siteContent}>
                    <Switch>
                        <Route path='/test' component={Test}/>

                        <Route path='/target' component={Target} />

                        <Route path='/login' component={Login} />
                        <Route path='/myCubes' component={MyCubes} />

                        <Route path='/cube/:handle/edit' component={EditCubePage} />
                        <Route path='/cube/:handle' component={ViewCubePage} />

                        <Route exact path='/' component={Splash} />
                    </Switch>
                </main>

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
        useMemo( () => createMuiTheme( user.theme ), [ user.theme ] ) :
        // Otherwise just use the default theme
        defaultTheme;

    return(
        <ThemeProvider theme={ useTheme }>
            <CssBaseline/>
            <WithTheme/>
        </ThemeProvider>
    );

};

const loadingStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
});

const App = () => {

    const classes = loadingStyles();

    const asyncUser = useAsync( networkCalls.FetchUserData, [] );

    // Bail early if we're prepping
    if( asyncUser.loading ){
        // TODO Write something quipy here
        return (
            <>
                <CssBaseline/>
                <div className={classes.root}>
                    <PageLoading/>
                </div>
            </>
        );
    }

    return(
        <Provider store={store}>
            <WithStore/>
        </Provider>
    );
};

ReactDOM.render( <App />, document.getElementById( 'root' ) );