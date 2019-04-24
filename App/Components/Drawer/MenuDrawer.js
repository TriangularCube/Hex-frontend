import React from 'react';
import PropTypes from 'prop-types';

// Router
import {Link} from 'react-router-dom';

// Material UI Utils
import withStyles from '@material-ui/core/es/styles/withStyles';

// Material UI Components
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



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