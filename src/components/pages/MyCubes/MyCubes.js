import React, { useEffect } from "react";

// Async hook
import { useAsync } from "react-async-hook";

// Router
import { Link as RouterLink, Redirect } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Material UI
import {Card, Container, Grid, Typography, Chip, IconButton, Link, Button} from "@material-ui/core";

// Icon
import { Edit as EditIcon } from "@material-ui/icons";

// Components
import PageTitle from "../../common/PageTitle";
import PageLoading from "../../common/PageLoading";

// Amp
import amp from "../../../util/amplify/amp";

// Styles
import { makeStyles } from "@material-ui/styles";

// Error codes
import errorCodes from "../../../util/errorCodes";




//region Cube Card
const cubeCardStyles = makeStyles( theme => ({
    cubeSection: {
        margin: `${theme.spacing( 1 )}px 0`
    },
    cubeInnerGrid: {
        flexGrow: 1
    },
    cubeContent: {
        padding: theme.spacing( 2 ),
        flex: 1
    },
    cubeDescriptionContainer: {
        height: theme.typography.fontSize * 2
    },
    tag: {
        height: 20,
        margin: `0 ${theme.spacing(1)}px`
    },
    tagLine: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing( 1 )
    },
    editButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    }
}));

const CubeLink = (props) => {
    return (
        <Link component={RouterLink} to={props.to}>
            <Typography variant='h5'>
                {props.children}
            </Typography>
        </Link>
    )
};

const CubeCard = ( props ) => {

    const classes = cubeCardStyles();

    const cube = props.cube;

    return(

        <Grid item className={classes.cubeSection}>
            <Card>

                <Grid item container className={classes.cubeInnerGrid}>

                    <div className={classes.cubeContent}>

                        <CubeLink to={`/cube/${cube.handle}`}>
                            {cube.name}
                        </CubeLink>

                        <div className={classes.cubeDescriptionContainer}>
                            <Typography variant='subtitle1' color='textSecondary'>
                                {
                                    cube.description ?
                                        cube.description :
                                        'No description'
                                }
                            </Typography>
                        </div>

                        <div className={classes.tagLine}>
                            <Chip className={classes.tag} color='primary' label='Tag!'/>
                            <Chip className={classes.tag} color='primary' label='Tag!'/>
                        </div>

                    </div>


                    <div>
                        <IconButton className={classes.editButton}>
                            <EditIcon/>
                        </IconButton>
                    </div>

                </Grid>

            </Card>
        </Grid>

    );

};
//endregion

//region Cube Page
const cubePageStyles = makeStyles(theme => ({
    topRowContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    spacer: {
        flex: 1
    },
    newCubeButtonContainer: {
        height: theme.fontSize,
        alignSelf: 'center'
    }
}));

const pageName = 'My Cubes';
const MyCubes = () => {

    // Check if user exists
    const user = useSelector( state => state.user );

    const classes = cubePageStyles();

    // First, set the page name
    useEffect( () => {
        document.title = pageName;
    }, [] );

    // Fire off an async request
    const asyncCubes = useAsync( async () => amp.Get( '/myCubes' ), [] );
    // FIXME this is a leak as the component will redirect away when the user logs out, but the function will return on an unmounted component

    // If not logged in, simply redirect to login page
    if( !user ){
        return <Redirect
            to={{
                pathname: '/login',
                state: {
                    referrer: '/myCubes'
                }
            }}
        />
    }

    // While it's loading
    if( asyncCubes.loading ){
        return(
            <PageLoading/>
        )
    }

    // If request not successful
    if( !asyncCubes.result.success ){

        if( asyncCubes.result.error === errorCodes.notLoggedIn ){

            // This should not happen and should have been guarded against. This is here as a sanity check only
            console.error( 'Not Logged In error from API on MyCubes' );
            return <Redirect to={'/login'}/>

        }

        // Otherwise Log the error
        console.error( `My Cubes fetch unsuccessful, error: ${asyncCubes.result.error}` );

        // TODO handle the error somehow
    }

    // Convenience
    const cubes = asyncCubes.result.cubes;

    return(
        <Container maxWidth='md'>

            {/* The Top Row */}
            <div className={classes.topRowContainer}>
                {/* Page Title */}
                <PageTitle>
                    {pageName}
                </PageTitle>

                {/* Spacer to fill row */}
                <div className={classes.spacer}/>

                {/* New Cube Button */}
                <div className={classes.newCubeButtonContainer}>
                    <Button variant='outlined'>
                        New Cube
                    </Button>
                </div>
            </div>

            {/* Grid of Cube List */}
            <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start'>
                {cubes.map( (element, index) => <CubeCard cube={element} key={index}/> )}
            </Grid>
        </Container>
    );

};
//endregion

export default MyCubes;