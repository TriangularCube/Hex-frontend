import {SwipeableDrawer, Button, Hidden, Drawer} from '@material-ui/core'

import withStyles from '@material-ui/core/es/styles/withStyles';

import {withRouter, Link} from 'react-router-dom';

const appBarHeight = 64;

const styles = {
    drawerPaper:{
        paddingTop: appBarHeight,
        width: 200
    },
    drawerButton: {
        flexGrow: 1
    },
    divider: {
        flexGrow: 1
    }
};

function LinkButton( props ){
    return(
        <Button component={Link} to={ props.to } onClick={ () => props.showDrawer( false ) }>{props.name}</Button>
    )
}

class MenuDrawer extends React.PureComponent{

    constructor( props ){
        super( props );

        this.redirect = this.redirect.bind(this);
    }

    redirect( location ){
        this.props.showDrawer( false );

        // TODO This will add another entry if redirecting to the same location. Work on Fix
        // https://github.com/ReactTraining/history/pull/570
        this.props.history.push( location );
    }

    render(){
        const {classes} = this.props;

        const drawer = (
            <>
                <LinkButton name="Main Page" to="/" showDrawer={this.props.showDrawer}/>

                <LinkButton name="Your Cubes" to="/cubes" showDrawer={this.props.showDrawer}/>

                <div className={this.props.classes.divider}/>

                <Button onClick={ () => this.props.showDrawer( false ) }>Close Drawer!</Button>
            </>
        );

        return(

            <>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer open={ this.props.shouldShowDrawer } onClose={ () => this.props.showDrawer( false ) } onOpen={ () => this.props.showDrawer( true ) }>
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer variant='persistent' open={true} classes={{paper: classes.drawerPaper}}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </>
        );
    }

}


let ws = withStyles( styles )( MenuDrawer );
export default withRouter( ws );