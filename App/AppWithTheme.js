import React from 'react';

// Custom components
import Navbar from "./Components/Navbar/Navbar";
import CubeList from "./Components/Pages/Cubes/CubeList";
import Splash from "./Components/Pages/Splash/Splash";

// Redux Stuff
import { connect } from "react-redux";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import {withTheme} from '@material-ui/core/styles'


class AppWithTheme extends React.Component{

	render(){
		return(

			/* Kept around for staging */
			<Router basename={process.env.URL_BASE_NAME} >
				<>
					<Navbar />

                    <Switch>
                        <Route path="/cubes" component={CubeList} />
                        <Route exact path="/" component={Splash} />
                    </Switch>

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



let wt = withTheme()( AppWithTheme );
export default connect( mapStateToProps )( wt );