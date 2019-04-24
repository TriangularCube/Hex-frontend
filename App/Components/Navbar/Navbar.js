import React from 'react';
import PropTypes from 'prop-types';

// Material UI Utils
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Icons
import AccIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    grow: {
        flexGrow: 1
    }
});


class Navbar extends React.PureComponent{

    render(){
        const { classes } = this.props;
        return(
            <>

                {/* App Bar, sticky so as to take up space. Grows, and has +1 index over Drawer */}
                <AppBar position="sticky" className={classes.root}>

                    {/* Toolbar needed to arrange items in Horizontal direction */}
                    <Toolbar>

                        {/* Menu Icon */}
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ () => this.props.toggleDrawer() }
                            className={ classes.menuButton }
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Site Title */}
                        <Typography variant='h6' color='inherit'>Hexahedron</Typography>

                        {/* Spacer */}
                        <div className={classes.grow} />

                        {/* User button */}
                        <IconButton color='inherit'>
                            <AccIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </>
        )
    }

}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};



let withAddedStyle = withStyles(styles)(Navbar);
export default withAddedStyle;