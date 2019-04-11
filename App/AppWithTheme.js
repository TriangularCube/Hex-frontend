// Utilities
import { CssBaseline } from "@material-ui/core";
import debounce from "javascript-debounce";

// Custom components
import Navbar from "./Components/Navbar/Navbar";
import MenuDrawer from "./Components/MenuDrawer";

import CubeList from "./Components/Pages/Cubes/CubeList";
import Splash from "./Components/Pages/Splash/Splash";


// With Width
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

// Router
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


// Redux
import {setIsLarge, setMobileDrawer} from "./Redux/Actions/UIActionCreators";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class AppWithTheme extends React.Component{

	constructor( props ){
		super( props );

		props.setIsLarge( isWidthUp( 'md', props.width ) );

		this.handleResize = this.handleResize.bind( this );
		this.handleResizeDebounce = debounce( this.handleResize, 500 );
	}


	componentDidMount() {
		// TODO Get user data from server (theme, etc.)

		window.addEventListener( 'resize', this.handleResizeDebounce );
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.handleResizeDebounce );
	}

	handleResize(){
		let isLarge = isWidthUp( 'md', this.props.width );
		let wasLarge = this.props.isLarge;

		if( isLarge && !wasLarge ){
			this.props.setIsLarge( true );
			return;
		}

		if( !isLarge && wasLarge ){
			this.props.setIsLarge( false );
			this.props.setMobileDrawer( false );
			return;
		}
	}

	render(){
		// Calculate the margin for an open drawer
		const largeDrawerMargin = this.props.isLarge && this.props.shouldShowDrawer ? this.props.theme.drawerWidth : 0;

		return(

				<>
					<CssBaseline />

					<Navbar toggleDrawer={this.toggleDrawer} />

					<Router>
						<>
							<MenuDrawer />

							<div style={ {marginLeft: largeDrawerMargin} }>
								<Switch>
									<Route path="/cubes" component={CubeList} />
									<Route exact path="/" component={Splash} />
								</Switch>
							</div>
						</>
					</Router>
				</>

		)
	}

}


function mapStateToProps( state ){
	return {
		isLarge: state.UI.isLarge,
		shouldShowDrawer: state.UI.shouldShowDrawer
	};
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		setIsLarge, setMobileDrawer
	}, dispatch );
}


let ww = withWidth( { withTheme: true } )(AppWithTheme);
export default connect( mapStateToProps, mapDispatchToProps )(ww);