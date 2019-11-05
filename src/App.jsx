//region Imports
// React and ReactDOM loaded from UMD

const {useMemo} = React;

import { useAsync } from "react-async-hook";

// Redux
import {Provider, useSelector} from "react-redux";
import store from "./redux/store";

// Router
const { Switch, Route } = ReactRouterDOM;
const Router = ReactRouterDOM.BrowserRouter;

// Material UI utils
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/styles";

// Material UI Components
import { Typography, CssBaseline } from "@material-ui/core";

// Snackbar
import { SnackbarProvider } from "notistack";

// Loadable
import loadable from "@loadable/component";

//region Hex components
import MenuDrawer from "./MenuDrawer";
import NavBar from "./NavBar";

import PageLoading from "./components/common/PageLoading";

const Target = loadable( () => import( /* webpackChunkName: "Target" */ "./components/pages/TargetSelect/Target" ) );
const Splash = loadable( () => import( /* webpackChunkName: "Splash" */ "./components/pages/Splash/Splash" ) );
const FetchData = loadable( () => import( /* webpackChunkName: "FetchData" */ "./components/pages/Splash/FetchData" ) );
const Login = loadable( () => import( /* webpackChunkName: "Login" */ "./components/pages/Account/Login" ) );
const MyCubes = loadable( () => import( /* webpackChunkName: "MyCubes" */ "./components/pages/MyCubes/MyCubes" ) );
const ViewCubePage = loadable( () => import( /* webpackChunkName: "ViewCube" */ "./components/pages/Cube/Cube" ) );
const EditCubePage = loadable( () => import( /* webpackChunkName: "EditCube" */ "./components/pages/MyCubes/CubeEdit" ) );

//endregion

// HACK strictly for debugging
const Debug = loadable( () => import( "../debug/debug" ) );

// Font (from UMD)
WebFont.load({
    google: {
        families: [ 'Roboto:300,500,700' ]
    }
});

// Configure Amplify
import { setDefaultConfig } from "./util/config";
setDefaultConfig();

// Network Calls
import networkCalls from "./util/networkCalls";

// Load Theme
import defaultThemeObject from "./util/defaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Card database
import useCardDB from "./util/cardDatabase/useCardDatabase";

//endregion


// Make styles
const useStyles = makeStyles( theme => ({
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
const WithThemeAndRouter = () => {

    const classes = useStyles();

    // Initialise the Card DB
    useCardDB();

    return (
        <>
            <MenuDrawer />
            <NavBar/>

            <main className={classes.siteContent}>
                <Switch>
                    <Route path='/debug' component={Debug}/>
                    <Route path='/fetch-data' component={FetchData}/>

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
        </>
    )
};

const loadingStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
        minHeight: '100vh'
    },
});

const WithSnackAndRedux = () => {

    const classes = loadingStyles();

    const asyncUser = useAsync( networkCalls.FetchUserData, [] );

    //region Figure out what theme to use

    // Grab the user from Redux
    const user = useSelector( state => state.user );

    // Use the user's custom theme if there is one
    const useTheme = user && user.theme ?
        // Memoize the user's theme to minimize having to create a new theme every time
        useMemo( () => createMuiTheme( user.theme ), [ user.theme ] ) :
        // Otherwise just use the default theme
        defaultTheme;
    //endregion

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
        <ThemeProvider theme={ useTheme }>
            <CssBaseline/>
            <div className={ classes.root }>
                <Router>
                    <WithThemeAndRouter/>
                </Router>
            </div>
        </ThemeProvider>
    );
};

const App = () => {
    return(
        <Provider store={store}>
            <SnackbarProvider>
                <WithSnackAndRedux/>
            </SnackbarProvider>
        </Provider>
    )
};

ReactDOM.render( <App />, document.getElementById( 'root' ) );