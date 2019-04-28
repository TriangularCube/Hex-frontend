import React from "react";

// Redux Stuff
import { connect } from "react-redux";
// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material UI Utils
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import withTheme from "@material-ui/core/styles/withTheme"
import withStyles from "@material-ui/core/styles/withStyles";

// Custom components
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import CubeList from "./Components/Pages/UserCubeList/CubeList";
import Splash from "./Components/Pages/Splash/Splash";
import DisplayCube from "./Components/Pages/DisplayCube/DisplayCube";

const styles = ( theme ) => ({
	pageContainer: theme.mixins.pageContainer
});

class AppWithTheme extends React.Component{

	constructor( props ){
		super( props );

		// Fetch state from LocalStorage
		let shouldShowDrawer = JSON.parse( localStorage.getItem( 'UIStateShouldShowDrawer' ) ) || true;

		this.state = {
			shouldShowDrawer: shouldShowDrawer,
			shouldShowMobileDrawer: false,
			isLarge: isWidthUp( props.theme.isLarge, props.width )
		};

		this.toggleDrawer = this.toggleDrawer.bind( this );
		this.turnOffMobileDrawer = this.turnOffMobileDrawer.bind( this );
	}


	componentDidMount() {
		// TODO Get user data from server (theme, etc.)
	}

	static getDerivedStateFromProps( props, state ){

		const isLarge = isWidthUp( props.theme.isLarge, props.width );
		const wasLarge = state.isLarge;

		if( isLarge && !wasLarge ){
			localStorage.setItem( 'UIStateShouldShowMobileDrawer', JSON.stringify( false ) );
			return {
				shouldShowMobileDrawer: false,
				isLarge: true
			};
		}

		if( !isLarge && wasLarge ){
			return {
				isLarge: false
			}
		}

		return null;

	}

	/* UI States shouldn't be in Redux
	 *
	 * A width aware toggle for drawer
	 */
	toggleDrawer(){
		this.setState( ( state ) => {
			if( state.isLarge ){
				let newState = !state.shouldShowDrawer;

				localStorage.setItem( 'UIStateShouldShowDrawer', JSON.stringify( newState ) );
				return {
					shouldShowDrawer: newState
				};
			} else {
				return {
					shouldShowMobileDrawer: !state.shouldShowMobileDrawer
				};
			}
		});
	}

	/* Specifically for the Menu Buttons in Small Configuration
	 * Will turn off Mobile Drawer once navigated
	 */
	turnOffMobileDrawer(){
		this.setState({
			shouldShowMobileDrawer: false
		});
	}


	render(){
		const contentMargin = this.state.isLarge && this.state.shouldShowDrawer ? this.props.theme.drawerWidth : 0;


		return(

			/* Kept around for staging */
			<Router basename={process.env.URL_BASE_NAME} >
				<>
                    <Navbar toggleDrawer={this.toggleDrawer} />
					<MenuDrawer
						shouldShowDrawer={this.state.shouldShowDrawer}
						shouldShowMobileDrawer={this.state.shouldShowMobileDrawer}
						toggleDrawer={this.toggleDrawer}
						turnOffMobileDrawer={this.turnOffMobileDrawer}
					/>

					<div style={ { marginLeft: contentMargin } }>
						<div className={this.props.classes.pageContainer}>
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

}


function mapStateToProps( state ){
	return {

		user: state.user,

	}
}


let wtww = withTheme()( withWidth( { withTheme: true } )( withStyles(styles)(AppWithTheme) ) );
export default connect( mapStateToProps )( wtww );