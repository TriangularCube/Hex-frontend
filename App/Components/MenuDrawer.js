import {SwipeableDrawer, Button, Hidden, Drawer} from '@material-ui/core'

import withStyles from '@material-ui/core/es/styles/withStyles';

import {withRouter, Link} from 'react-router-dom';

import {toggleDrawer, toggleMobileDrawer} from "../Redux/Actions/UIActionCreators";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
        <Button component={Link} to={ props.to } onClick={ () => props.toggleDrawer() }>{props.name}</Button>
    )
}

class MenuDrawer extends React.PureComponent{

    render(){
        const {classes, toggleDrawer, shouldShowDrawer, toggleMobileDrawer, shouldShowMobileDrawer} = this.props;

        const drawer = (
            <>
                <LinkButton name="Main Page" to="/" toggleDrawer={toggleDrawer}/>

                <LinkButton name="Your Cubes" to="/cubes" toggleDrawer={toggleDrawer}/>

                <div className={classes.divider}/>

                <Button onClick={ this.props.isLarge? () => toggleDrawer() : () => toggleMobileDrawer() }>Close Drawer!</Button>
            </>
        );

        return(

            <>
                <Hidden mdUp implementation="js">
                    <SwipeableDrawer open={ shouldShowMobileDrawer } onClose={ () => toggleMobileDrawer() } onOpen={ () => toggleMobileDrawer() }>
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>

                <Hidden smDown implementation="js">
                    <Drawer variant='persistent' transitionDuration={0} open={ shouldShowDrawer } classes={{paper: classes.drawerPaper}}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </>
        );
    }

}

function mapStateToProps( state ){
    return {
        isLarge: state.UI.isLarge,
        shouldShowDrawer: state.UI.shouldShowDrawer,
        shouldShowMobileDrawer: state.UI.shouldShowMobileDrawer
    };
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        toggleDrawer, toggleMobileDrawer
    }, dispatch );
}


let ws = withStyles( styles )( MenuDrawer );
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( ws ) );