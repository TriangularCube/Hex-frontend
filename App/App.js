// Theme
import defaultThemeObject from "./Util/DefaultTheme";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

const defaultTheme = createMuiTheme( defaultThemeObject );

// App
import AppWithTheme from "./AppWithTheme";


// Redux
import { connect } from "react-redux";

class App extends React.Component{

    render(){
        // TODO pull this into a function
        let useTheme = ( this.props.user && this.props.user.theme ) ? this.props.user.theme : defaultTheme;

        return(

            <MuiThemeProvider theme={ useTheme }>
                <AppWithTheme />
            </MuiThemeProvider>

        )
    }

}

function mapStateToProps( state ){
    return {

        user: state.user,

    }
}


export default connect( mapStateToProps )( App );