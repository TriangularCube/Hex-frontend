import {AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
import { AccountCircle as AccIcon, Menu as MenuIcon } from "@material-ui/icons"

// Redux
import { showDrawer } from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
});


class Navbar extends React.Component{

    render(){
        const { classes } = this.props;
        return(
            <React.Fragment>

                <AppBar position="sticky" className={classes.root}>
                    <Toolbar>
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ () => this.props.showDrawer( true ) }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' className={classes.grow}>Hexahedron 0.0.1</Typography>
                        <IconButton color='inherit'>
                            <AccIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </React.Fragment>
        )
    }

}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};


function mapStateToProps( state ){
    return {
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


let withAddedStyle = withStyles(styles)(Navbar);
export default connect( mapStateToProps, mapDispatchToProps )(withAddedStyle);