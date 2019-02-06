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
import { showDrawer } from "./Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class App extends React.Component{

    constructor( props ){
        super( props );

        // DEBUG
        this.state = {
            user: null,
            shouldDisplayDrawer: false
        };

    }



    componentDidMount() {
        // TODO Get user data from server (theme, etc.)
        console.log( this.props.shouldShowDrawer );
    }


    render(){
        return(

            <MuiThemeProvider theme={ this.state.user ? this.state.user.theme : defaultTheme }>
                <CssBaseline />

                <Navbar />

                {/*<Button onClick={this.testStore}>Test Store!</Button>*/}
                <Button onClick={ () => this.props.showDrawer( true ) }>Display Drawer!</Button>

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

        shouldShowDrawer: state.shouldShowDrawer

    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators(
        {
            showDrawer
        },
        dispatch
    );
}


export default connect( mapStateToProps, mapDispatchToProps )( App );