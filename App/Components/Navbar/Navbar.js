import React from 'react';

import {Link as RouterLink} from "react-router-dom";

import {AppBar, Toolbar, Link, IconButton, Button} from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle as AccIcon } from "@material-ui/icons"


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    hexText: {
        width: 150
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

                <AppBar position="sticky">
                    <Toolbar>
                        <Link component={RouterLink} to='/' color='inherit' variant='h6' underline='none'>
                            Hexahedron
                        </Link>

                        <div className={classes.grow} />

                        <Button color='inherit'>Featured</Button>
                        <Button component={RouterLink} to={'/cubes'} color='inherit'>My Cubes</Button>
                        <Button color='inherit'>Advanced Search</Button>

                        <IconButton color='inherit'>
                            <AccIcon/>
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