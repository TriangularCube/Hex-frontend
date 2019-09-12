import React, { useState } from "react";

import { useAsync } from "react-async-hook";

// Redux
import { useSelector } from "react-redux";

// Amp
import networkCalls from "../../../util/config/networkCalls";

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
    const user = useSelector( state => state.user );

    const classes = useStyles();

    // Tabs
    // FIXME
    const [tabValue, setTabValue] = useState( 1 );



    //region Fetch Cube and check for errors

    // Fetch the cube
    // TODO implement some sort of transfer from MyCubes possibly
    /*
    const asyncGetCube = useAsync( async () => {
        return await networkCalls.GetWithAuth( `/cube/${handle}` );
    }, [] );

    // Back out if loading
    if( asyncGetCube.loading ){
        return <PageLoading />
    }

    if( asyncGetCube.error ){
        // DEBUG
        console.error( 'Error getting cube, message: ', asyncGetCube.error );

        // TODO
        return null;
    }

    if( !asyncGetCube.result.success ){
        // DEBUG
        console.error( 'Error fetching cube from server, server message: ', asyncGetCube.result.error );

        // TODO
        return null;
    }
    */

    // const cube = asyncGetCube.result.cube;
    // DEBUG
    const cube = testCube;

    // DEBUG
    console.log( 'Cube: ', cube );
    // console.log( 'User: ', user );

    /*
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

    const handleDrop = ( result ) => {
        console.log( result );

        // Back out early if no action is needed
        if( result.destination === null ||
            ( result.destination.droppableId === result.source.droppableId
                 && result.destination.index === result.source.index ) ){
            return;
        }

        // TODO
        let sourceList, destinationList;

        // Abstract the lists away so I don't have to worry about calling the right list
        switch ( result.source.droppableId ) {
            case cubeDroppableId:
                sourceList = cube.cards;
                break;
            case workspaceDroppableId:
                sourceList = cube.workspace;
                break;
            case searchDroppableId:
                // TODO
                break;
            default:
                console.error( 'Droppable ID not linked to list' );
        }
        switch ( result.destination.droppableId ) {
            case cubeDroppableId:
                destinationList = cube.cards;
                break;
            case workspaceDroppableId:
                destinationList = cube.workspace;
                break;
            case searchDroppableId:
                // TODO
                break;
            default:
                console.error( 'Droppable ID not linked to list' );
        }

        let element = result.source.droppableId === searchDroppableId ?
            // If coming from Search, simply copy element
            // TODO
            sourceList[result.source.index]
            :
            // Remove 1 element at index
            sourceList.splice( result.source.index, 1 );

        // Insert the element to location at index, and remove 0 elements
        destinationList.splice( result.destination.index, 0, element[0] );

    };

    const SearchAndEdit = () => {
        return (
            <>
                {/* Div here to space the top properly to line up with the Search heading */}
                <div className={classes.listSpacer}>
                    <CubeList
                        cubeList={cube.cards}
                        droppableId={cubeDroppableId}
                    />
                    <Workspace
                        workspaceList={cube.workspace}
                        droppableId={workspaceDroppableId}
                    />
                </div>

                <SearchColumn
                    droppableId={searchDroppableId}
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