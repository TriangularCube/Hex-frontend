import { AppBar, Toolbar } from "@material-ui/core";

class Navbar extends React.Component{

    render(){
        return(
            <React.Fragment>

                <AppBar position="sticky">
                    <Toolbar>
                        <p>Hey!</p>
                    </Toolbar>
                </AppBar>

            </React.Fragment>
        )
    }

}

export default Navbar;