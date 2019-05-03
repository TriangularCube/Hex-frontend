import React, {useEffect, useState} from 'react';

// Material UI Utils
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

// Theme
import defaultThemeObject from "../Data/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Redux
import { connect } from "react-redux";

// Router
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// The App
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";

import loadable from "@loadable/component";
const Splash = loadable( () => import( "./Components/Pages/Splash/Splash" ) );
const UserCubeList = loadable( () => import( "./Components/Pages/UserCubeList/UserCubeList" ) );
const EditCube = loadable( () => import ( "./Components/Pages/UserCubeList/EditCube" ) );



const saveStateName = 'UIStateShowDrawer';

const useStyles = makeStyles(({
    pageContainer: {
        maxWidth: 1200,
        margin: `24px auto`,
        padding: '0 16px'
    }
}));

function App( props ){

    // Fetch state from LocalStorage
    let shouldShowDrawer = JSON.parse( localStorage.getItem( saveStateName ) );

    // Show Drawer State Hooks
    const [showDeskDrawer, setDeskDrawer] = useState( shouldShowDrawer );
    const [showMobileDrawer, setMobileDrawer] = useState( false );

    // Figure out what theme to use
    const useTheme = ( props.user && props.user.theme ) ? props.user.theme : defaultTheme;

    // Use Media Query
    const isLarge = useMediaQuery( useTheme.breakpoints.up( useTheme.isLarge ) );

    // Turn mobile drawer off if we've switched to Desktop view
    useEffect( () => {

        if( isLarge ){
            // If we're now large, but was not before
            setMobileDrawer( false ); // Retract the mobile drawer
        }

        // Else do nothing

    }, [isLarge] );

    // Determine if there should be a margin for page content
    const contentMargin = isLarge && showDeskDrawer ? useTheme.drawerWidth : 0;

    // Drawer toggle based on size
    const toggleDrawer = () => {
        if( isLarge ){
            const target = !showDeskDrawer;
            setDeskDrawer( target );

            // Save to local storage for persistence
            localStorage.setItem( saveStateName, JSON.stringify( target ) );
        } else {
            setMobileDrawer( !showMobileDrawer );
        }
    };

    const classes = useStyles();

    return(
        <ThemeProvider theme={ useTheme }>
            <CssBaseline />

            <Navbar toggleDrawer={toggleDrawer} />

            {/* Kept around for staging */}
            <Router basename={process.env.URL_BASE_NAME} >
                <>
                    <MenuDrawer
                        showDeskDrawer={showDeskDrawer}
                        showMobileDrawer={showMobileDrawer}
                        toggleDrawer={toggleDrawer}
                        retractMobileDrawer={() => setMobileDrawer( false )}
                    />

                    <div style={ { marginLeft: contentMargin } }>
                        <div className={classes.pageContainer}>
                            <Switch>
                                <Route path="/cubes" component={UserCubeList} />
                                <Route path="/cube/:id/:edit?" component={EditCube} />
                                <Route exact path="/" component={Splash} />
                            </Switch>
                        </div>
                    </div>
                </>
            </Router>
        </ThemeProvider>
    )

}

function mapStateToProps( state ){
    return {
        user: state.user
    }
}

export default connect( mapStateToProps )( App );