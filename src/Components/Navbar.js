import React from "react";

// Material UI Utils
import { makeStyles } from "@material-ui/styles";

// Material UI Components
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Typography from "@material-ui/core/Typography/index";
import IconButton from "@material-ui/core/IconButton/index";

// Icons
// import AccIcon from "@material-ui/icons/AccountCircle";
// import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles( theme => ({
    appBar: {
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
}));


function Navbar( props ){

    const classes = useStyles();
    return(
        <>

            {/* App Bar, sticky so as to take up space. Grows, and has +1 index over Drawer */}
            <AppBar position="sticky" className={classes.appBar}>

                {/* Toolbar needed to arrange items in Horizontal direction */}
                <Toolbar>

                    {/* Menu Icon */}
                    <IconButton
                        color = 'inherit'
                        aria-label = 'Open Drawer'
                        onClick={ () => props.toggleDrawer() }
                        className={ classes.menuButton }
                    >
                        {/*<MenuIcon />*/}
                    </IconButton>

                    {/* Site Title */}
                    <Typography variant='h6' color='inherit'>Hexahedron</Typography>

                    {/* Spacer */}
                    <div className={classes.grow} />

                    {/* TODO will probably replace this with Sidebar Account Displays */}
                    {/* User button */}
                    <IconButton color='inherit'>
                        {/*<AccIcon/>*/}
                    </IconButton>

                </Toolbar>
            </AppBar>

        </>
    )
}

export default Navbar;