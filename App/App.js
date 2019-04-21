import React from 'react';

import {MuiThemeProvider} from "@material-ui/core/es";
import {CssBaseline} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/es/styles";

// Redux
import { connect } from "react-redux";

// Theme
import defaultThemeObject from "./Util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

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