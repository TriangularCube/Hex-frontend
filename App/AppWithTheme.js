import React, { useState, useEffect } from "react";

// Redux Stuff
import { connect } from "react-redux";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material UI Utils
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom components
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import CubeList from "./Components/Pages/UserCubeList/CubeList";
import Splash from "./Components/Pages/Splash/Splash";
import DisplayCube from "./Components/Pages/DisplayCube/DisplayCube";

const useStyles = makeStyles( theme => ({
	pageContainer: theme.mixins.pageContainer
}));

function AppWithTheme(){

	// Fetch state from LocalStorage
	let shouldShowDrawer = JSON.parse( localStorage.getItem( 'UIStateShouldShowDrawer' ) ) || true;

	// Show Drawer State Hooks
	const [showDeskDrawer, setDeskDrawer] = useState( shouldShowDrawer );
	const [showMobileDrawer, setMobileDrawer] = useState( false );

	// Fetch the Theme with a Hook
	const theme = useTheme();

	// Use Media Query
	const isLarge = useMediaQuery( theme.breakpoints.up( theme.isLarge ) );

	// Turn mobile drawer off if we've switched to Desktop view
	useEffect( () => {

		if( isLarge ){
			// If we're now large, but was not before
			setMobileDrawer( false ); // Retract the mobile drawer
		}

		// Else do nothing

	}, [isLarge] );

	// Determine if there should be a margin for page content
	const contentMargin = isLarge && showDeskDrawer ? theme.drawerWidth : 0;

	// Drawer toggle based on size
	const toggleDrawer = () => {
		if( isLarge ){
			setDeskDrawer( !showDeskDrawer );
		} else {
			setMobileDrawer( !showMobileDrawer );
		}
	};

	const classes = useStyles();

	return(

		/* Kept around for staging */
		<Router basename={process.env.URL_BASE_NAME} >
			<>
				<Navbar toggleDrawer={toggleDrawer} />
				<MenuDrawer
					showDeskDrawer={showDeskDrawer}
					showMobileDrawer={showMobileDrawer}
					toggleDrawer={toggleDrawer}
					retractMobileDrawer={() => setMobileDrawer( false )}
				/>

				<div style={ { marginLeft: contentMargin } }>
					<div className={classes.pageContainer}>
						<Switch>
							<Route path="/cubes" component={CubeList} />
							<Route path="/cube/:id/:edit?" component={DisplayCube} />
							<Route exact path="/" component={Splash} />
						</Switch>
					</div>
				</div>
			</>
		</Router>

	)

}


function mapStateToProps( state ){
	return {

		user: state.user,

	}
}


export default connect( mapStateToProps )( AppWithTheme );