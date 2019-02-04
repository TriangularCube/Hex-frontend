import { AppBar, Toolbar } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/es/styles";

let theme = createMuiTheme({
    typography: {
        useNextVariants: true // Apparently default typography uses features being deprecated soon
    }
});

function App(){
    return(
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <p>Hey!</p>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </React.Fragment>
    )
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );