import {SwipeableDrawer, Button} from '@material-ui/core'
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = {
    divider: {
        flexGrow: 1
    }
};

class MenuDrawer extends React.Component{

    render(){
        return(

            <SwipeableDrawer open={ this.props.shouldShowDrawer } onClose={ () => this.props.showDrawer( false ) } onOpen={ () => this.props.showDrawer( true ) }>

                <Button onClick={ () => this.props.showDrawer( false ) }>Close Drawer!</Button>

                <div className={this.props.classes.divider}/>

                <Button onClick={ () => this.props.showDrawer( false ) }>Close Drawer!</Button>

            </SwipeableDrawer>

        );
    }

}


let ws = withStyles( styles )( MenuDrawer );
export default ws;