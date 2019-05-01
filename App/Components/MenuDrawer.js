import React from "react";
import PropTypes from "prop-types";

// Router
import {Link} from "react-router-dom";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/index";
import Button from "@material-ui/core/Button/index";
import Hidden from "@material-ui/core/Hidden/index";
import Drawer from "@material-ui/core/Drawer/index";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import Divider from "@material-ui/core/Divider/index";


const useStyles = makeStyles( theme => ({
    spacer: {
        ...theme.mixins.toolbar
    },
    spacerPadding: {
        height: 2
    },
    drawerPaper:{
        width: theme.drawerWidth
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
    const { showMobileDrawer, showDeskDrawer, toggleDrawer, retractMobileDrawer } = props;

    // Link Button, used in Drawer
    const LinkButton = (name, to) => (
        <Button component={Link} to={to} onClick={ () => retractMobileDrawer() }>{name}</Button>
    );

    // List of components to display in Drawer. Separated here since it's used twice
    const DrawerList = (
        <>
            {/* Shim for proper spacing under the App Bar  */}
            <div className={classes.spacer} />
            <div className={classes.spacerPadding} />

            {/* Possibly use with List */}
            {LinkButton( 'Main Page', '/' )}

            {LinkButton( 'My Cubes', '/cubes' )}

            {LinkButton( 'A Cube', '/cube/0' )}

            <div className={classes.divider}/>

            <Divider />
            <List>
                <ListItem button>
                    {/*<ListItemIcon />*/}
                    <ListItemText>
                        Credits or something!
                    </ListItemText>
                </ListItem>
            </List>
        </>
    );

    return(

        <>
            {/* First the Mobile Drawer */}
            <Hidden smUp implementation="js">
                <SwipeableDrawer open={ showMobileDrawer } onClose={ () => retractMobileDrawer } onOpen={ () => toggleDrawer() }>
                    {DrawerList}
                </SwipeableDrawer>
            </Hidden>

            {/* Then the large sized Drawer */}
            <Hidden xsDown implementation="js">
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

export default MenuDrawer;