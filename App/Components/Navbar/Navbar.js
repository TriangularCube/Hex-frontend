import {AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
// import { AccountCircle as AccIcon, Menu as MenuIcon } from "@material-ui/icons"


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    grow: {
        flexGrow: 1
    }
});


class Navbar extends React.PureComponent{

    render(){
        const { classes } = this.props;
        return(
            <>

                <AppBar position="sticky" className={classes.root}>
                    <Toolbar>
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ () => this.props.toggleDrawer() }
                        >
                            {/*<MenuIcon />*/}
                        </IconButton>
                        <Typography variant='h6' color='inherit' className={classes.grow}>Hexahedron</Typography>
                        <IconButton color='inherit'>
                            {/*<AccIcon/>*/}
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </>
        )
    }

}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};



let withAddedStyle = withStyles(styles)(Navbar);
export default withAddedStyle;