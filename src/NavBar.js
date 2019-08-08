import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setMobileDrawer } from "./Redux/actionCreators";

// Router
import { Link } from "react-router-dom";

// Material UI Utils
import { fade } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

// Material UI
import { AppBar, Toolbar, IconButton, Button, ButtonBase, Typography, InputBase, Hidden } from "@material-ui/core";

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
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
}));


const NavBar = () => {

    const classes = useStyles();

    // Get stuff from Redux
    const dispatch = useDispatch();
    const mobileDrawerOpen = useSelector( state => state.mobileDrawerOpen );
    const user = useSelector( state => state.user );

    // Fetch theme
    const theme = useTheme();

    // Figure out if the page is in Large mode
    const isLargeMode = useMediaQuery( theme.breakpoints.up( isLarge ) );

    const toggleDrawer = () => {
        // Toggle the mobile drawer
        dispatch( setMobileDrawer( !mobileDrawerOpen ) );
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
                {/* TODO Change this to clickable */}
                <ButtonBase component={Link} to={'/'}>
                    <Typography color='inherit' variant='h5'>
                        Hexahedron
                    </Typography>
                </ButtonBase>



                {/* Spacer */}
                <div className={classes.spacer} />

                {/* TODO Add Hidden */}

                <Hidden smDown>
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

                    {/* Debug Suite */}
                    <Button color='inherit' component={Link} to='/test'>
                        Test
                    </Button>

                    {/* TODO replace with menu */}
                    <Button color='inherit' component={Link} to='/login'>
                        Login
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
                <IconButton color='inherit'>
                    <AccIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )

};

export default NavBar;