// Utilities
import { MuiThemeProvider } from "@material-ui/core/es/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/es/styles";

// Components
import {Button, SwipeableDrawer} from "@material-ui/core";

// Custom components
import Navbar from "./Components/Navbar/Navbar";
import defaultThemeObject from "./Util/DefaultTheme";
const defaultTheme = createMuiTheme( defaultThemeObject );

// Redux Stuff
import { requestLogin, setUser, showDrawer } from "./Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class App extends React.Component{

    constructor( props ){
        super( props );

        this.getUser = this.getUser.bind( this );
        this.createUser = this.createUser.bind( this );
        this.showUser = this.showUser.bind( this );
    }


    componentDidMount() {
        // TODO Get user data from server (theme, etc.)
       this.showUser();
    }

    showUser(){
        console.log( this.props.user );
    }

    getUser(){
        fetch( 'http://localhost:3000/users/0', {
            method: 'GET',
            mode: "cors",
            cache: "default",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            }
        } ).then(
            ( response ) => { return response.json() },
            ( rejected ) => { console.log( rejected ) }
        ).then(
            ( data ) => { this.props.setUser( data ) },
            ( rejected ) => { console.log( rejected ) }
        );
    }

    createUser(){
        fetch( 'http://localhost:3000/users', {
            method: 'POST',
            mode: "cors",
            cache: "default",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": "bluntweapon",
                "password": "pillerjunction"
            })
        } ).then(
            ( response ) => { return response.json() },
            ( rejected ) => { console.log( rejected ) }
        ).then(
            ( data ) => { console.log( data ) },
            ( rejected ) => { console.log( rejected ) }
        );
    }


    render(){
        return(

            <MuiThemeProvider theme={ this.props.user ? ( this.props.user.theme ? this.props.user.theme : defaultTheme )  : defaultTheme }>
                <CssBaseline />

                <Navbar />

                {/*<Button onClick={this.testStore}>Test Store!</Button>*/}
                <Button onClick={ () => this.props.showDrawer( true ) }>Display Drawer!</Button>
                <Button onClick={ this.getUser }>Get User</Button>
                <Button onClick={ this.createUser }>Create User</Button>
                <Button onClick={ this.showUser }>Show User</Button>
                <Button onClick={ this.props.requestLogin }>Request Login</Button>

                <SwipeableDrawer open={ this.props.shouldShowDrawer } onOpen={() => this.props.showDrawer( true ) } onClose={() => this.props.showDrawer( false ) }>
                    {/*TODO*/}
                    <Button onClick={() => this.props.showDrawer( false ) }>Button!</Button>
                </SwipeableDrawer>

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
            showDrawer
        },
        dispatch
    );
}


export default connect( mapStateToProps, mapDispatchToProps )( App );