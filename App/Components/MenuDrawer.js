import { SwipeableDrawer, Button } from '@material-ui/core'
import { showDrawer } from "../Redux/actionCreators";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class MenuDrawer extends React.Component{

    render(){
        return(

            <SwipeableDrawer open={ this.props.shouldShowDrawer } onClose={ () => this.props.showDrawer( false ) } onOpen={ () => this.props.showDrawer( true ) }>

                <Button onClick={ () => this.props.showDrawer( false ) }>Close Drawer!</Button>

            </SwipeableDrawer>

        );
    }

}


function mapStateToProps( state ){
    return{

        shouldShowDrawer: state.shouldShowDrawer

    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators(
        {
            showDrawer
        },
        dispatch
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( MenuDrawer );