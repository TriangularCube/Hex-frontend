import React from "react";

import { useAsync } from "react-async-hook";

// Redux
import { useSelector } from "react-redux";

// Amp
import amp from "../../../util/amplify/amp";

// Draggable
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

// Hex components
import PageLoading from "../../common/PageLoading";
import PageTitle from "../../common/PageTitle";

const useStyles = makeStyles({
    page: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingRight: 40,
        paddingLeft: 40
    },
    contextSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
        // height: '100%',
        // weight: '100%'
    },
    cubeList: {
        width: '100%',
        maxWidth: '30%'
    }
});

const CubeEdit = ( props ) => {

    const handle = props.match.params.handle;

    const user = useSelector( state => state.user );

    const classes = useStyles();

    // Fetch the cube
    // TODO implement some sort of transfer from MyCubes possibly
    const asyncGetCube = useAsync( async () => {
        return await amp.GetWithAuth( `/cube/${handle}` );
    }, [] );

    // Back out if loading
    if( asyncGetCube.loading ){
        return <PageLoading />
    }

    //region Errors
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
    //endregion

    const cube = asyncGetCube.result.cube;

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

    const handleDrop = ( result ) => {
        console.log( result );
    };

    // Cube List column
    const CubeList = () =>
        <Droppable droppableId='cubeList'>
            { ( provided ) => (
                <div className={ classes.cubeList }>
                    <Typography variant='h5'>
                        Cube List
                    </Typography>

                    <List ref={ provided.innerRef }>
                        {/* DEBUG */ }
                        <div style={ { border: 1, borderColor: '#ffffff', borderStyle: 'solid' } }>
                            <Draggable
                                draggableId={ 'cubeList-0' }
                                index={ 0 }
                            >
                                { ( provided ) => (
                                    <ListItem
                                        ref={ provided.innerRef }
                                        { ...provided.draggableProps }
                                        { ...provided.dragHandleProps }
                                    >
                                        <div style={ { background: '#feba13', width: '100%' } }>
                                            <ListItemText
                                                primary='Some Text'
                                                secondary='Secondary Text'
                                            />
                                        </div>
                                    </ListItem>
                                ) }
                            </Draggable>

                            <Draggable
                                draggableId={ 'cubeList-1' }
                                index={ 1 }
                            >
                                { ( provided ) => (
                                    <ListItem
                                        ref={ provided.innerRef }
                                        { ...provided.draggableProps }
                                        { ...provided.dragHandleProps }
                                    >
                                        <ListItemText
                                            primary='Some Other Text'
                                        />
                                    </ListItem>
                                ) }
                            </Draggable>
                            { provided.placeholder }
                        </div>
                    </List>
                </div>
            ) }
        </Droppable>;

    // Workspace column
    const Workspace = () =>
        <Droppable droppableId='workspace'>
            {( provided ) => (

                <List ref={provided.innerRef} style={{ border: 1 }}>
                    <Draggable
                        draggableId={'0'}
                        index={0}
                    >
                        {(provided) => (
                            <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <div style={{ background: '#feba13', width: '100%' }}>
                                    <ListItemText
                                        primary='Some Text'
                                        secondary='Secondary Text'
                                    />
                                </div>
                            </ListItem>
                        )}
                    </Draggable>

                    <Draggable
                        draggableId={'1'}
                        index={1}
                    >
                        {(provided) => (
                            <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <ListItemText
                                    primary='Some Other Text'
                                />
                            </ListItem>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </List>
            )}
        </Droppable>;

    return(
        <div className={classes.page}>
            <PageTitle>
                Edit This Cube!
            </PageTitle>

            <DragDropContext
                onDragEnd={ handleDrop }
            >
                <div className={classes.contextSection}>

                    <CubeList/>
                    <Workspace/>

                </div>

            </DragDropContext>
        </div>
    )
};

export default CubeEdit;