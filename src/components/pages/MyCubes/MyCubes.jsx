import React, {useEffect, useRef, useState} from "react";

// Async hook
import { useAsync } from "react-async-hook";

// Router
import { Link as RouterLink } from "react-router-dom";

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
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, CircularProgress
} from "@material-ui/core";

// Icon
import { Edit as EditIcon, Close as CloseIcon } from "@material-ui/icons";

// Components
import PageTitle from "../../common/PageTitle";
import PageLoading from "../../common/PageLoading";
import useCheckUser from "../../../util/useCheckUser";

// Amp
import networkCalls from "../../../util/networkCalls";

// Styles
import { makeStyles } from "@material-ui/styles";


const pageName = 'My Cubes';


//region Create New Cube
const createCubeStyles = makeStyles( theme => ({
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
    }
}));
const CreateNewCube = ( {display, setDisplay, history} ) => {

    const classes = createCubeStyles();

    const [loading, setLoading] = useState( false );

    let newCubeNameRef = useRef( null );
    const handleNewCube = async () => {

        const cubeName = newCubeNameRef.current.value;

        if( cubeName.length < 1 ){
            // TODO deal with empty name
            console.log( 'Name too short' );
            return;
        }

        setLoading( true );

        const body = {
            name: cubeName
        };

        const res = await networkCalls.Post( '/newCube', body );

        console.log( 'Created new cube ', res );

        if( res.success ){
            history.push( `/cube/${ res.data.handle }` );
        } else {
            // TODO handle error creating cube
            console.error( 'Could not create cube' );
            setLoading( false );
        }

    };

    return (
        <Dialog
            open={display}
            onClose={ () => setDisplay(false) }
            fullWidth
            maxWidth={ 'sm' }
        >
            <DialogTitle disableTypography className={classes.dialogTitle}>
                <Typography variant='h6'>
                    Create New Cube
                </Typography>
                <IconButton className={classes.closeIcon} onClick={ () => setDisplay( false ) }>
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
                {
                    loading ?
                        // TODO make better looking
                        <CircularProgress/>
                        :
                        <Button color='primary' onClick={handleNewCube}>
                            Create
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
};
//endregion

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

                        <CubeLink to={`/cube/${cube[1]}`}>
                            {cube[0]}
                        </CubeLink>

                        <div className={classes.cubeDescriptionContainer}>
                            <Typography variant='subtitle1' color='textSecondary'>
                                {
                                    cube[2] ?
                                        cube[2] :
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
    createButton: {
        right: theme.spacing( 1 ),
        top: theme.spacing( 1 )
    }
}));


const MyCubes = ( props ) => {

    useCheckUser( props.history, '/myCubes' );

    const [openNewCubeDialog, setNewCubeDialog] = useState( false );

    const classes = cubePageStyles();

    // First, set the page name
    useEffect( () => {
        document.title = pageName;
    }, [] );

    // Fire off an async request
    const asyncCubes = useAsync( async () => networkCalls.GetWithAuth( '/myCubes' ), [] );
    // FIXME this is a leak as the component will redirect away when the user logs out,
    //  but the function will return on an unmounted component

    // While it's loading
    if( asyncCubes.loading ){
        return(
            <PageLoading/>
        )
    }

    //region Error
    if( asyncCubes.error ){

        console.error( 'Error connecting to server, message: ', asyncCubes.error );

        // TODO handle the error somehow
        return null;
    }

    if( !asyncCubes.result.success ){

        // Otherwise Log the error
        console.error( `My Cubes fetch unsuccessful, error: ${asyncCubes.result.error}` );

        // TODO handle the error somehow
        return null;
    }
    //endregion

    // Convenience
    const cubes = asyncCubes.result.data;

    console.log( cubes );

    return(
        <Container maxWidth='md'>

            <CreateNewCube
                display={openNewCubeDialog}
                setDisplay={setNewCubeDialog}
                history={props.history}
            />

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