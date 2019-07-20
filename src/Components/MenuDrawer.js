"use strict";

import React from "react";
import PropTypes from "prop-types";

// Router
import {Link} from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { drawerWidth } from "~/Data/constants/";
import {Typography} from "@material-ui/core";


const useStyles = makeStyles( theme => ({
    userDisplay: {
        ...theme.mixins.toolbar
    },
    drawerPaper:{
        width: drawerWidth
    },
    drawerButton: {
        flexGrow: 1
    },
    divider: {
        flexGrow: 1
    }
}));


function MenuDrawer( props ){

    const classes = useStyles();
    const { showMobileDrawer, showDeskDrawer, toggleDrawer, retractMobileDrawer, user } = props;


    // Link Button, used in Drawer
    const LinkButton = (name, to) => (
        <Button component={Link} to={to} onClick={ () => retractMobileDrawer() }>{name}</Button>
    );

    // List of components to display in Drawer. Separated here since it's used twice
    const DrawerList = (
        <>
            {/* Shim for proper spacing under the App Bar  */}
            <div className={classes.userDisplay}>
                { user ? (
                    <Typography color='inherit'>
                        {user.name}
                    </Typography>
                ) : (
                    // Display nothing if User isn't present
                    null
                )}
            </div>
            <Divider />

            {/* Possibly use with List */}
            {LinkButton( 'Login', '/login')}

            {LinkButton( 'Main Page', '/' )}

            {LinkButton( 'My Cubes', '/cubes' )}

            {LinkButton( 'A Cube', '/cube/0' )}

            {LinkButton( 'FaunaDB Test', '/fauna' )}

            <div className={classes.divider}/>

            <Divider />
            {LinkButton( `${process.env.NODE_ENV.charAt(0).toUpperCase() + process.env.NODE_ENV.slice(1)} build`, '' )}
        </>
    );

    return(

        <>
            {/* First the Mobile Drawer */}
            <Hidden smUp implementation="css">
                <SwipeableDrawer open={ showMobileDrawer } onClose={ () => retractMobileDrawer() } onOpen={ () => toggleDrawer() }>
                    {DrawerList}
                </SwipeableDrawer>
            </Hidden>

            {/* Then the large sized Drawer */}
            <Hidden xsDown implementation="css">
                <Drawer variant='persistent' open={ showDeskDrawer } classes={{paper: classes.drawerPaper}}>
                    {DrawerList}
                </Drawer>
            </Hidden>
        </>
    );

}



MenuDrawer.propTypes = {
    showDeskDrawer: PropTypes.bool.isRequired,
    showMobileDrawer: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    retractMobileDrawer: PropTypes.func.isRequired
};


function mapStateToProps( state ){
    return({
        user: state.user
    })
}

export default connect( mapStateToProps )( MenuDrawer );