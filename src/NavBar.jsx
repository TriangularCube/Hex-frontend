import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setMobileDrawer } from "./redux/actionCreators";

// Router
import { Link, withRouter } from "react-router-dom";

// Amp, for Logout
import networkCalls from "./util/networkCalls";

// Material UI Utils
import { fade } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/styles";
import {ListItemText, useMediaQuery} from "@material-ui/core";

// Material UI
import { AppBar, Toolbar, IconButton, Button, ButtonBase, Typography, InputBase, Hidden, Menu, MenuItem } from "@material-ui/core";

// Icons
import { AccountCircle as AccIcon, Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";


// Constant
import { isLarge, sidePadding } from "./util/constants";




const useStyles = makeStyles( theme => ({
    appBar: {
        // display: 'block',
        // alignItems: 'center'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    spacer: {
        flex: 1,
        // width: '100%'
    },
    toolbar: {
        alignSelf: 'center',
        // maxWidth: pageWidth,
        width: '100%',
        padding: `0 ${sidePadding}px`
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width' ),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    menuItemText: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right'
    }
}));


const NavBar = ( props ) => {

    const classes = useStyles();

    // Get stuff from Redux
    const dispatch = useDispatch();
    const mobileDrawerOpen = useSelector( state => state.mobileDrawerOpen );
    const user = useSelector( state => state.user );

    // Fetch theme
    const theme = useTheme();

    // Figure out if the page is in Large mode
    const isLargeMode = useMediaQuery( theme.breakpoints.up( isLarge ) );

    // Menu stuff
    const [anchor, setAnchor] = useState( null );
    const openMenu = ( event ) => {
        setAnchor( event.currentTarget );
    };
    const closeMenu = () => {
        setAnchor( null );
    };

    const toggleDrawer = () => {
        // Toggle the mobile drawer
        dispatch( setMobileDrawer( !mobileDrawerOpen ) );
    };

    const handleLogout = async () => {
        // Initiate logout
        const res = await networkCalls.Logout();

        if( res ){
            // If successful, close menu and redirect to homepage
            closeMenu();
            props.history.push( '/' );
        } else {
            console.error( 'Failed to logout' );
            // TODO
        }
    };

    return(
         // App Bar, sticky so as to take up space. Grows, and has +1 index over Drawer
        <AppBar position='sticky' classes={{ root: classes.appBar }}>
            {/* Toolbar needed to arrange items in Horizontal direction */}
            <Toolbar disableGutters={true} classes={{ root: classes.toolbar }}>
                {
                    !isLargeMode ?
                        // Menu Icon
                        <IconButton
                            color = 'inherit'
                            aria-label = 'Open Drawer'
                            onClick={ toggleDrawer }
                            className={ classes.menuButton }
                        >
                            <MenuIcon />
                        </IconButton>
                    : null
                }

                {/* Site Title */}
                <Hidden smDown>
                    <ButtonBase component={Link} to={'/'}>
                        <Typography color='inherit' variant='h5'>
                            Hexahedron
                        </Typography>
                    </ButtonBase>
                </Hidden>


                {/* Spacer */}
                <div className={classes.spacer} />

                {/* Search */}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

                <Hidden smDown>
                    {/* Debug Suite */}
                    <Button color='inherit' component={Link} to='/test'>
                        Test
                    </Button>

                    {/* My Cubes */}
                    {
                        user !== null &&
                            <Button color='inherit' component={Link} to='/myCubes'>
                                My Cubes
                            </Button>
                    }

                </Hidden>


                {/* User button */}
                <div>
                    <IconButton color='inherit' onClick={openMenu}>
                        <AccIcon/>
                    </IconButton>
                    <Menu
                        id='account-menu'
                        anchorEl={anchor}
                        getContentAnchorEl={null}
                        open={Boolean( anchor )}
                        onClose={ closeMenu }
                        anchorOrigin={{
                            vertical: 30,
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        {
                            user === null ?
                                <MenuItem
                                    onClick={ closeMenu }
                                    component={Link}
                                    to='/login'
                                >
                                    <ListItemText className={classes.menuItemText} primary='Login'/>
                                </MenuItem>
                                :
                                <MenuItem
                                    onClick={ handleLogout }
                                >
                                    <ListItemText className={classes.menuItemText} primary='Logout'/>
                                </MenuItem>
                        }

                        <MenuItem
                            onClick={ closeMenu }
                            component={Link}
                            to='/target'
                        >
                            <ListItemText primary='Target Selection'/>
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )

};

export default withRouter( NavBar );