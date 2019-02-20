import {AppBar, Button, Toolbar, Typography, IconButton} from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
import AccIcon from "@material-ui/icons/AccountCircle"


const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
};


class Navbar extends React.Component{

    render(){
        const { classes } = this.props;
        return(
            <React.Fragment>

                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant='h6' color='inherit' className={classes.grow}>Hexahedron 0.0.1</Typography>
                        <IconButton color='inherit'>
                            <AccIcon/>
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

export default withStyles(styles)(Navbar);