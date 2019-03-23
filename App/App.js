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
import { requestLogin, setUser, showDrawer, checkCookie } from "./Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class App extends React.Component{

    constructor( props ){
        super( props );

        this.showUser = this.showUser.bind( this );
    }


    componentDidMount() {
        // TODO Get user data from server (theme, etc.)
       this.showUser();
    }

    showUser(){
        console.log( this.props.user );
    }


    render(){

        let useTheme = defaultTheme;
        if( this.props.user && this.props.user.theme ){
            useTheme = this.props.user.theme;
        }

        return(

            <MuiThemeProvider theme={ useTheme }>
                <CssBaseline />

                <Navbar />
                <MenuDrawer />

                <CubeList />

                {/*<Button onClick={this.testStore}>Test Store!</Button>*/}
                <Button onClick={ this.showUser }>Show User</Button>
                <Button onClick={ this.props.requestLogin }>Request Login</Button>
                <Button onClick={ this.props.checkCookie }>Check Cookie</Button>


            </MuiThemeProvider>

        )
    }

}


function mapStateToProps( state ){
    return {

        user: state.user,
        shouldShowDrawer: state.shouldShowDrawer

    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators(
        {
            requestLogin,
            setUser,
            showDrawer,
            checkCookie
        },
        dispatch
    );
}


export default connect( mapStateToProps, mapDispatchToProps )( App );