import React, {useEffect, useRef, useState} from "react";

// Async hook
import { useAsync } from "react-async-hook";

// Router
import { Link as RouterLink, Redirect } from "react-router-dom";

// Material UI
import {
    Card,
    Container,
    Grid,
    Typography,
    Chip,
    IconButton,
    Link,
    Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from "@material-ui/core";

// Icon
import { Edit as EditIcon, Close as CloseIcon } from "@material-ui/icons";

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
    },

    //region Create Cube Dialog
    dialogTitle: {
        padding: theme.spacing( 2 )
    },
    dialogContent: {
        padding: `${theme.spacing( 2 )}px ${theme.spacing( 2 )}px 0`
    },
    dialogActions: {
        padding: theme.spacing( 2 )
    },
    closeIcon: {
        position: 'absolute',
        right: theme.spacing( 1 ),
        top: theme.spacing( 1 )
    },
    createButton: {
        right: theme.spacing( 1 ),
        top: theme.spacing( 1 )
    }
    //endregion
}));

const pageName = 'My Cubes';
const MyCubes = ( props ) => {

    const classes = cubePageStyles();

    // First, set the page name
    useEffect( () => {
        document.title = pageName;
    }, [] );

    //region New Cube handling
    const [openNewCubeDialog, setNewCubeDialog] = useState( false );
    let newCubeNameRef = useRef( null );
    const handleNewCube = async () => {

        const cubeName = newCubeNameRef.current.value;

        if( cubeName.length < 1 ){
            // TODO deal with empty name
            console.log( 'Name too short' );
            return;
        }

        const body = {
            name: cubeName
        };

        const res = await amp.Post( '/newCube', body );

        if( res.success ){
            props.history.push( `/cube/${ res.handle }` );
        } else {
            // TODO handle error creating cube
            console.error( 'Could not create cube' );
        }

    };
    //endregion


    // Fire off an async request
    const asyncCubes = useAsync( async () => amp.GetWithAuth( '/myCubes' ), [] );
    // FIXME this is a leak as the component will redirect away when the user logs out,
    //  but the function will return on an unmounted component

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
            console.error( 'Not Logged In error from API on MyCubes, redirecting to login' );
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

            <Dialog
                open={openNewCubeDialog}
                onClose={ () => setNewCubeDialog(false) }
                fullWidth
                maxWidth={ 'sm' }
            >
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant='h6'>
                        Create New Cube
                    </Typography>
                    <IconButton className={classes.closeIcon} onClick={ () => setNewCubeDialog( false ) }>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText>
                        Please specify a name for the new Cube:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        label='Cube Name'
                        inputRef={newCubeNameRef}
                    />
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button color='primary' onClick={handleNewCube}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

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
                    <Button variant='outlined' onClick={ () => setNewCubeDialog( true ) }>
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