// Utilities
import { MuiThemeProvider } from "@material-ui/core/es/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/es/styles";

// Custom components
import Navbar from "./Components/Navbar/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import CubeList from "./Components/Pages/Cubes/CubeList";
import Splash from "./Components/Pages/Splash/Splash";

// Theme
import defaultThemeObject from "./Util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Redux Stuff
import { requestLogin, setUser, checkCookie } from "./Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// With Width
import withWidth from '@material-ui/core/withWidth';



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


        let contentMargin = this.state.shouldShowDrawer ? 146 : 0;
        // console.log( this.state.shouldShowDrawer );

        return(

            <Router>
                <MuiThemeProvider theme={ useTheme }>
                    <CssBaseline />

                    <Navbar showDrawer={this.showDrawer} />
                    <MenuDrawer shouldShowDrawer={this.state.shouldShowDrawer} showDrawer={this.showDrawer} />

                    <div style={ { marginLeft: 146 } }> {/* TODO Replace this with an implementation that uses ShowDrawer*/}
                        <Switch>
                            <Route path="/cubes" component={CubeList} />
                            <Route exact path="/" component={Splash} />
                        </Switch>
                    </div>

                </MuiThemeProvider>
            </Router>

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


let ww = withWidth()(App);
export default connect( mapStateToProps, mapDispatchToProps )( ww );