import {AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
//import { AccountCircle as AccIcon, Menu as MenuIcon } from "@material-ui/icons"


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
});


class Navbar extends React.Component{

    render(){
        const { classes } = this.props;
        return(
            <React.Fragment>

                <AppBar position="sticky" className={classes.root}>
                    <Toolbar>
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ () => this.props.showDrawer( true ) }
                        >
                            {/*<MenuIcon />*/}
                        </IconButton>
                        <Typography variant='h6' color='inherit' className={classes.grow}>Hexahedron</Typography>
                        <IconButton color='inherit'>
                            {/*<AccIcon/>*/}
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </React.Fragment>
        )
    }

}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};



let withAddedStyle = withStyles(styles)(Navbar);
export default withAddedStyle;