import React from 'react';

import {withRouter} from 'react-router-dom';

import {AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
// import { AccountCircle as AccIcon, Menu as MenuIcon } from "@material-ui/icons"


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    toolbar: theme.mixins.toolbar,
    grow: {
        flexGrow: 1
    }
});


class Navbar extends React.PureComponent{

    render(){
        const { classes, pageName } = this.props;
        return(
            <>

                <AppBar position="sticky" className={classes.root}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ () => this.props.toggleDrawer() }
                        >
                            {/*<MenuIcon />*/}
                        </IconButton>

                        {/* Location Name */}
                        <Typography variant='h6' color='inherit' className={classes.grow}>
                            {pageName}
                        </Typography>

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
export default withRouter( withAddedStyle );