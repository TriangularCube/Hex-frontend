import {SwipeableDrawer, Button, Hidden, Drawer} from '@material-ui/core'

import withStyles from '@material-ui/core/es/styles/withStyles';

import {withRouter, Link} from 'react-router-dom';


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

function LinkButton( props ){
    return(
        <Button component={Link} to={ props.to } onClick={ () => props.turnOffMobileDrawer() }>{props.name}</Button>
    )
}

class MenuDrawer extends React.PureComponent{


    render(){
        const {classes, shouldShowDrawer, shouldShowMobileDrawer, toggleDrawer, turnOffMobileDrawer} = this.props;

        const drawer = (
            <>
                <LinkButton name="Main Page" to="/" turnOffMobileDrawer={turnOffMobileDrawer} />

                <LinkButton name="Your Cubes" to="/cubes" turnOffMobileDrawer={turnOffMobileDrawer} />

                <div className={classes.divider}/>

                <Button onClick={ () => toggleDrawer() }>Close Drawer!</Button>
            </>
        );

        return(

            <>
                <Hidden smUp implementation="js">
                    <SwipeableDrawer open={ shouldShowMobileDrawer } onClose={ () => toggleDrawer() } onOpen={ () => toggleDrawer() }>
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>

                <Hidden xsDown implementation="js">
                    <Drawer variant='persistent' open={ shouldShowDrawer } classes={{paper: classes.drawerPaper}}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </>
        );
    }

}


let ws = withStyles( styles )( MenuDrawer );
export default withRouter( ws );