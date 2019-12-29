const {useEffect} = React;

// Redux
import {useDispatch, useSelector} from "react-redux";
import { setMobileDrawer } from "./redux/actionCreators";

// Router
import { Link } from "react-router-dom";

// Material UI Util
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

// Material UI
import { Typography, ButtonBase, Button, Hidden, SwipeableDrawer, Drawer, Divider } from "@material-ui/core";

// Misc
import {drawerWidth, isLarge} from "./util/constants";


// Styles
const useStyles = makeStyles(theme => ({
    userDisplay: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerPaper: {
        width: drawerWidth
    },
    divider: {
        flex: 1
    }
}));

const MenuDrawer = () => {

    // Use styles
    const classes = useStyles();

    // Fetch drawer state
    const mobileDrawerOpen = useSelector( state => state.mobileDrawerOpen );

    // Fetch Dispatch
    const dispatch = useDispatch();

    // A convenience function for closing the drawer
    const closeMobileDrawer = () => dispatch( setMobileDrawer( false ) );

    // Fetch the theme
    const theme = useTheme();

    // Figure out if the page is in Large mode
    const isLargeMode = useMediaQuery( theme.breakpoints.up( isLarge ) );

    // Close the mobile drawer if we've gotten past breakpoint for Large screens
    useEffect( () => {
        if( isLargeMode ){
            closeMobileDrawer();
        }
    }, [isLargeMode] );

    // Link Button, used in Drawer
    const LinkButton = (name, to) => (
        <Button
            onClick={ closeMobileDrawer }
            component={Link}
            to={to}
        >
            {name}
        </Button>
    );

    // List of items in the Drawer
    const DrawerList = (
        <>
            <div className={classes.userDisplay}>
                <Typography variant='h5' color='inherit'>
                    Hexahedron
                </Typography>
            </div>

            {/* TODO Other Links */}
            {LinkButton( 'Main Page', '/' )}
            {LinkButton( 'My Cubes', '/myCubes' )}
            {LinkButton( 'Login Test', '/login')}

            <div className={classes.divider}/>

            <Divider />
            {LinkButton( `${process.env.NODE_ENV.charAt(0).toUpperCase() + process.env.NODE_ENV.slice(1)} build`, '/target' )}
        </>
    );

    return(

        // TODO
        <>
            {/* First the Mobile Drawer */}
            <Hidden smUp implementation="css">
                <SwipeableDrawer
                    open={ mobileDrawerOpen }
                    onClose={ () => dispatch( setMobileDrawer( false ) ) }
                    onOpen={ () => dispatch( setMobileDrawer( true ) ) }
                    classes={{ paper: classes.drawerPaper }} // TODO maybe use an actual class
                >
                    {DrawerList}
                </SwipeableDrawer>
            </Hidden>
        </>

    );

};

export default MenuDrawer;