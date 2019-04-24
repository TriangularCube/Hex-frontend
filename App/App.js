import React from 'react';

// Material UI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

// Theme
import defaultThemeObject from "./Util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Redux
import { connect } from "react-redux";

// The App
import AppWithTheme from "./AppWithTheme";

class App extends React.Component{

    render(){
        // TODO pull this into a function
        let useTheme = ( this.props.user && this.props.user.theme ) ? this.props.user.theme : defaultTheme;

        return(
            <MuiThemeProvider theme={ useTheme }>
                <CssBaseline />

                <AppWithTheme />
            </MuiThemeProvider>
        )
    }

}

function mapStateToProps( state ){
    return {
        user: state.user
    }
}

export default connect( mapStateToProps )( App );