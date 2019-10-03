import React, { useState, useEffect } from "react";

// Amp
import networkCalls from "../../../util/networkCalls";

// Draggable
import { DragDropContext } from "react-beautiful-dnd";

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

import { CubeList, Workspace, SearchColumn } from "./CubeEditComponents";


const cubeDroppableId = 'cubeDroppable',
      workspaceDroppableId = 'workspaceDroppable',
      searchDroppableId = 'searchDroppable';

// DEBUG
import testCube from "./cubeTestData";
import useCheckUser from "../../../util/useCheckUser";

const useStyles = makeStyles( theme => ({
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
    },
    listSpacer: {
        marginTop: 16,
        flex: 2,
        display: 'flex',
        flexDirection: 'row'
    }
}));


const CubeEdit = ( props ) => {

    // Cube handle
    const handle = props.match.params.handle;

    // This is to check...user status?
    const user = useCheckUser( props.history, `/cube/${handle}/edit` );

    const classes = useStyles();

    // Tabs
    // FIXME
    const [tabValue, setTabValue] = useState( 1 );

    const [loadingCube, setLoading] = useState( true );
    const [cube, setCube] = useState( testCube );

    //region Fetch Cube and check for errors

    const [error, setError] = useState( null );

    // Fetch the cube
    // TODO implement some sort of transfer from MyCubes possibly

    useEffect( () => {
        networkCalls.GetWithAuth( `/cube/${handle}` )
            .then( (res) => {

                setLoading( false );

                if( !res.success ){
                    setError( 'Unsuccessful retrieval, ', res.error );
                } else {
                    // DEBUG
                    // setCube( res.data );
                    console.log( 'Got data from server: ', res.data );
                }

            }).catch( (err) => {
                setError( err.message );
                setLoading( false );
            });
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

    //endregion

    // Search results don't survive changing tabs
    // TODO Figure out a way to persist search across tab change
    let searchResults = null;
    const setSearchResults = (results) => {
        searchResults = results;
    };

    const handleDrop = ( result ) => {
        console.log( result );

        // Back out early if no action is needed
        if( result.destination === null ||
            ( result.destination.droppableId === result.source.droppableId
                 && result.destination.index === result.source.index ) ){

            console.log( "Drag action doesn't need any action" );
            return;

        }

        // TODO
        let sourceList, destinationList;

        // Abstract the lists away so I don't have to worry about calling the right list
        switch ( result.source.droppableId ) {
            case cubeDroppableId:
                sourceList = cube.lists.cube;
                break;
            case workspaceDroppableId:
                sourceList = cube.lists.workspace;
                break;
            case searchDroppableId:
                // Clone the array so we don't have worry about working on it
                sourceList = [...searchResults];
                break;
            default:
                console.error( 'Droppable ID not linked to list' );
        }
        switch ( result.destination.droppableId ) {
            case cubeDroppableId:
                destinationList = cube.lists.cube;
                break;
            case workspaceDroppableId:
                destinationList = cube.lists.workspace;
                break;
            case searchDroppableId:
                console.error( "Drop target is Search Column. This should not have happened" );
                break;
            default:
                console.error( 'Droppable ID not linked to list' );
        }

        const element = (sourceList.splice( result.source.index, 1 ))[0];
        const newElement = {
            cardId: element.id
        };

        // Insert the element to location at index, and remove 0 elements
        destinationList.splice( result.destination.index, 0, newElement );

    };

    const SearchAndEdit = () => {
        return (
            <>
                {/* Div here to space the top properly to line up with the Search heading */}
                <div className={classes.listSpacer}>
                    <CubeList
                        cubeList={cube.lists.cube}
                        droppableId={cubeDroppableId}
                    />
                    <Workspace
                        workspaceList={cube.lists.workspace}
                        droppableId={workspaceDroppableId}
                    />
                </div>

                <SearchColumn
                    droppableId={searchDroppableId}
                    setSearchResults={setSearchResults}
                />
            </>
        );
    };

    const TabDisplay = () => {
        switch ( tabValue ) {
            case 0:
                // TODO
                return null;
            case 1:
                return <SearchAndEdit/>;
            case 2:
                return null;
            case 3:
                return null;
            default:
                console.error( 'Tab request unknown' );
                return null;
        }
    };

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

            <DragDropContext
                onDragEnd={ handleDrop }
            >
                <div className={classes.contextSection}>

                    <TabDisplay/>

                </div>

            </DragDropContext>
        </div>
    )
};

export default CubeEdit;