import React from "react";

const { useState, useEffect } = React;

// Amp
import networkCalls from "../../../util/networkCalls";

// React DND
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import {
    Divider,
    Tabs,
    Tab
} from "@material-ui/core";

// Hex components
import PageLoading from "../../common/PageLoading";
import PageTitle from "../../common/PageTitle";
import useCheckUser from "../../../util/useCheckUser";

import { CubeList, SearchColumn, Workspace } from "./SearchAndEdit";


// DEBUG
import testCube from "../../../../debug/cubeTestData";


import { getCard } from "../../../util/cardDatabase/cardDatabase";


const useStyles = makeStyles( theme => ({
    // Right area of Search and Edit Tab
    rightArea: {
        marginTop: 16,
        width: 400,
        display: 'flex',
        flexDirection: 'row'
    },

    page: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingRight: theme.spacing( 3 ),
        paddingLeft: theme.spacing( 3 )
    },
    contextSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // height: '100%',
        // width: '80%'
    }
}));


const CubeEdit = ( props ) => {

    // region Hooks and initial properties, Fetch cube

    // Cube handle
    const handle = props.match.params.handle;

    // This is to check...user status?
    const user = useCheckUser( props.history, `/cube/${handle}/edit` );

    const classes = useStyles();

    // Tabs
    const [tabValue, setTabValue] = useState( 1 );

    const [loadingCube, setLoading] = useState( true );

    // DEBUG
    const [cube, setCube] = useState( testCube );

    const [error, setError] = useState( null );


    // Fetch the cube
    // TODO implement some sort of transfer from MyCubes possibly

    // DEBUG
    /*
    useEffect( () => {
        networkCalls.GetWithAuth( `/cube/${handle}` )
            .then( (res) => {

                if( !res.success ){
                    setError( 'Unsuccessful retrieval, ', res.error );
                } else {
                    // DEBUG TODO
                    // setCube( res.data );
                    console.log( 'Got data from server: ', res.data );
                }

            }).catch( (err) => {
                setError( err.message );
            }).finally( () => setLoading( false ) );
    }, [] );
    */

    // DEBUG
    // Fetch all cube cards from DB
    useEffect( () => {
        // Promisify all of cube prepping
        Promise.all(
            // Map all of cube
            cube.lists.cube.map( async (element,index) => {
                // So that we get the card from DB
                cube.lists.cube[index] = await getCard(element);
            })
        ).then( () => {
            // This doesn't really need to be here
            console.log( 'Done prepping cube.', cube.lists.cube );
        }).catch( err => {
            // Catch errors, obviously
            console.error( err );
            setError( true );
        }).finally( () => {
            // Finally, display the page
            setLoading( false );
        })
    }, [] );

    // Back out if loading
    if( loadingCube ){
        return <PageLoading />;
    }

    if( error ){
        // DEBUG
        console.error( 'Error getting cube, message: ', error );

        // TODO
        return null;
    }


    /*
    // DEBUG
    console.log( 'Cube: ', cube );
    console.log( 'User: ', user );

    // FIXME This is maybe too naive an implementation?
    if( cube.owner.displayName !== user.displayName ){
        console.error( 'Owner of Cube and current user do not match' );

        // TODO
        return (
            <p>
                User and Cube Owner mismatch
            </p>
        )
    }
    */

    //endregion


    // region Build the tab to be displayed

    let TabDisplay;
    switch ( tabValue ) {
        case 0:
            // TODO
            break;
        case 1:
            // NOTE Apparently I need to explicitly re-make the two lists when the cube changes
            //  since I use hooks
            let CubeDisplay = () => <CubeList cube={cube} setCube={setCube} />;
            let WorkspaceDisplay = () => <Workspace cube={cube} setCube={setCube} />;

            TabDisplay = (
                <>
                    {/* CubeList should take up most of the screen */}
                    <CubeDisplay/>

                    {/* Div here to arrange the Search and Workspace properly */}
                    <div className={classes.rightArea}>
                        <SearchColumn/>
                        <WorkspaceDisplay/>
                    </div>
                </>
            );
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            console.error( 'Tab request unknown' );
            break;
    }
    // endregion

    return(
        <div className={classes.page}>
            {/* TODO Change this to custom implementation with editable title */}
            <PageTitle>
                {cube.name}
            </PageTitle>

            <Tabs
                value={tabValue}
                onChange={ (evt, newValue) => setTabValue( newValue ) }
                aria-label='View Editing Tabs'
                variant='fullWidth'
            >
                <Tab label='Description' />
                <Tab label='Search' />
                <Tab label='Workspace' />
                <Tab label='Update' />
            </Tabs>

            <Divider />

            <div className={classes.contextSection}>

                <DndProvider backend={HTML5Backend}>
                    {TabDisplay}
                </DndProvider>

            </div>
        </div>
    )
};

export default CubeEdit;