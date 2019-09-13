import React, {useState} from "react";

import {useAsync} from "react-async-hook";

import networkCalls from "../../../util/networkCalls";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import {
    Container,
    Grid,
    Paper,
    Tabs,
    Tab,
    Divider,
    Button,
    Typography
} from "@material-ui/core";

// Hex Components
import PageTitle from "../../common/PageTitle";
import PageLoading from "../../common/PageLoading";


const useStyles = makeStyles((theme) => ({
    topRowContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    spacer: {
        flex: 1
    },
    editButton: {
        height: theme.fontSize,
        alignSelf: 'center'
    },
    cubeListTab: {
        display: 'flex',
        flexDirection: 'row'
    },
    cubeCoverSection: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            maxHeight: 400,
            // width: 'auto'
            objectFit: 'contain'
        }
        // maxHeight: 400
    },
    cubeDescriptionSection: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    divider: {
        marginBottom: theme.spacing( 2 )
    }
}));

const Cube = ( props ) => {

    const handle = props.match.params.handle;

    // Get the cube
    const asyncGetCube = useAsync( async () => {
        return await networkCalls.Get( `/cube/${handle}` );
    }, [] );

    const classes = useStyles();

    // Tab Support
    const [tabValue, setTabValue] = useState( 0 );

    // Back out while loading
    if( asyncGetCube.loading ){
        return <PageLoading/>
    }

    //region Errors
    if( asyncGetCube.error ){
        // DEBUG
        console.log( 'Error loading cube, message ' + asyncGetCube.error );

        // TODO
        return null;
    }

    if( !asyncGetCube.result.success ){
        // DEBUG
        console.log( 'Error fetching the cube, message from server ' + asyncGetCube.result.error );

        // TODO
        return null;
    }
    //endregion

    const cube = asyncGetCube.result.cube;
    // TODO

    const Description = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={3}>
                    <Paper className={classes.cubeCoverSection}>

                        {/* HACK */}
                        <img
                            src='https://placekitten.com/400/400'
                            alt='Cube Image'
                            className={classes.coverImage}
                        />

                        <Typography variant='h5'>
                            {cube.name}
                        </Typography>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Paper className={classes.cubeDescriptionSection}>
                        <div>
                            <p>
                                Cube Description
                            </p>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )
    };

    const CubeListing = () => {
        return(
            <p>
                List
            </p>
        )
    };

    const handleEditButton = () => {
        props.history.push( `${handle}/edit` );
    };

    return(
        <Container maxWidth='lg'>
            {/* The Top Row */}
            <div className={classes.topRowContainer}>
                {/* Page Title */}
                <PageTitle>
                    Cube Name
                </PageTitle>

                {/* Spacer to fill row */}
                <div className={classes.spacer}/>

                {/* New Cube Button */}
                <div className={classes.editButton}>
                    <Button variant='outlined' onClick={ handleEditButton }>
                        Edit Cube
                    </Button>
                </div>
            </div>

            <Tabs
                value={tabValue}
                onChange={ (evt, newValue) => setTabValue(newValue) }
                aria-label='View Cube Tabs'
                variant='fullWidth'
            >
                <Tab label='Description' />
                <Tab label='List' />
                <Tab label='Data' />
                <Tab label='Test' />
            </Tabs>

            <Divider className={classes.divider} />

            {
                tabValue === 0 ?
                    <Description />
                    :
                    <CubeListing />
            }

        </Container>
    )

};

export default Cube;