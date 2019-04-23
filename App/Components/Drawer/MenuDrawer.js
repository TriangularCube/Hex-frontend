import React from 'react';

import {
    SwipeableDrawer,
    Button,
    Hidden,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider
} from '@material-ui/core'

import withStyles from '@material-ui/core/es/styles/withStyles';

import {withRouter, Link} from 'react-router-dom';


const styles = theme => ({
    drawerPaper:{
        width: theme.drawerWidth
    },
    headerParent: {
        height: theme.appBarHeight,
        display: 'table'
    },
    headerChild: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    drawerButton: {
        flexGrow: 1
    },
    divider: {
        flexGrow: 1
    }
});

function LinkButton( props ){
    return(
        <Button component={Link} to={ props.to } onClick={ () => props.turnOffMobileDrawer() }>{props.name}</Button>
    )
}

function DrawerList( props ){
    const { classes } = props;

    return(
        <>
            <div className={classes.headerParent}>
                <Typography paragraph variant="h6" className={ classes.headerChild }>
                    Hexahedron
                </Typography>
            </div>

            <Divider />

            {/* Possibly use with List */}
            <LinkButton name="Main Page" to="/" turnOffMobileDrawer={ props.turnOffMobileDrawer} />

            <LinkButton name="My Cubes" to="/cubes" turnOffMobileDrawer={ props.turnOffMobileDrawer} />

            <div className={classes.divider}/>

            <Divider />
            <List>
                <ListItem button onClick={ () => console.log( process.env.URL_BASE_NAME + " | " + process.env.NODE_ENV ) }>
                    {/*<ListItemIcon />*/}
                    <ListItemText>
                        Credits or something!
                    </ListItemText>
                </ListItem>
            </List>
        </>
    )
}

class MenuDrawer extends React.PureComponent{


    render(){
        const {classes, shouldShowDrawer, shouldShowMobileDrawer, toggleDrawer, turnOffMobileDrawer} = this.props;

        return(

            <>
                <Hidden smUp implementation="js">
                    <SwipeableDrawer open={ shouldShowMobileDrawer } onClose={ () => toggleDrawer() } onOpen={ () => toggleDrawer() }>
                        <DrawerList turnOffMobileDrawer={turnOffMobileDrawer} toggleDrawer={toggleDrawer} classes={classes} />
                    </SwipeableDrawer>
                </Hidden>

                <Hidden xsDown implementation="js">
                    <Drawer variant='persistent' open={ shouldShowDrawer } classes={{paper: classes.drawerPaper}}>
                        <DrawerList turnOffMobileDrawer={turnOffMobileDrawer} toggleDrawer={toggleDrawer} classes={classes} />
                    </Drawer>
                </Hidden>
            </>
        );
    }

}


let ws = withStyles( styles )( MenuDrawer );
export default withRouter( ws );