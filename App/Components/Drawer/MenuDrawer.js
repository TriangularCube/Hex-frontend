import React from 'react';
import PropTypes from 'prop-types';

import {
    SwipeableDrawer,
    Button,
    Hidden,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core'

import withStyles from '@material-ui/core/es/styles/withStyles';

import {Link} from 'react-router-dom';


const styles = theme => ({
    drawerPaper:{
        paddingTop: theme.appBarHeight,
        width: theme.drawerWidth
    },
    drawerButton: {
        flexGrow: 1
    },
    divider: {
        flexGrow: 1
    }
});

class MenuDrawer extends React.PureComponent{


    render(){
        const {classes, shouldShowDrawer, shouldShowMobileDrawer, toggleDrawer, turnOffMobileDrawer} = this.props;

        // Link Button, used in Drawer
        const LinkButton = (name, to) => (
            <Button component={Link} to={to} onClick={ () => turnOffMobileDrawer() }>{name}</Button>
        );

        // List of components to display in Drawer. Separated here since it's used twice
        const DrawerList = (
            <>
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
                    <SwipeableDrawer open={ shouldShowMobileDrawer } onClose={ () => toggleDrawer() } onOpen={ () => toggleDrawer() }>
                        {DrawerList}
                    </SwipeableDrawer>
                </Hidden>

                {/* Then the large sized Drawer */}
                <Hidden xsDown implementation="js">
                    <Drawer variant='persistent' open={ shouldShowDrawer } classes={{paper: classes.drawerPaper}}>
                        {DrawerList}
                    </Drawer>
                </Hidden>
            </>
        );
    }

}

MenuDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    shouldShowDrawer: PropTypes.bool.isRequired,
    shouldShowMobileDrawer: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    turnOffMobileDrawer: PropTypes.func.isRequired
};

let ws = withStyles( styles )( MenuDrawer );
export default ws;