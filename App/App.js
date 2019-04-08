// Utilities
import { MuiThemeProvider } from "@material-ui/core/es/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/es/styles";

// Components
import {Button, SwipeableDrawer} from "@material-ui/core";

// Custom components
import Navbar from "./Components/Navbar/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import CubeList from "./Components/CubeList";
import defaultThemeObject from "./Util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Redux Stuff
import { requestLogin, setUser, checkCookie } from "./Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class App extends React.Component{

    constructor( props ){
        super( props );

        this.state = {
            shouldShowDrawer: false
        };

        this.showDrawer = this.showDrawer.bind( this );
    }


    componentDidMount() {
        // TODO Get user data from server (theme, etc.)
    }

    // UI States shouldn't be in Redux
    showDrawer( shouldShow ){
        this.setState({
            shouldShowDrawer: shouldShow
        });
    }


    render(){

        // TODO pull this into a function
        let useTheme = ( this.props.user && this.props.user.theme ) ? this.props.user.theme : defaultTheme;

        return(

            <MuiThemeProvider theme={ useTheme }>
                <CssBaseline />

                <Navbar showDrawer={this.showDrawer} />
                <MenuDrawer shouldShowDrawer={this.state.shouldShowDrawer} showDrawer={this.showDrawer} />

                <CubeList />

                {/*<Button onClick={this.testStore}>Test Store!</Button>*/}
                {/*<Button onClick={ this.showUser }>Show User</Button>*/}
                {/*<Button onClick={ this.props.requestLogin }>Request Login</Button>*/}
                {/*<Button onClick={ this.props.checkCookie }>Check Cookie</Button>*/}


            </MuiThemeProvider>

        )
    }

}


function mapStateToProps( state ){
    return {

        user: state.user,

    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators(
        {
            requestLogin,
            setUser,
            checkCookie
        },
        dispatch
    );
}


export default connect( mapStateToProps, mapDispatchToProps )( App );