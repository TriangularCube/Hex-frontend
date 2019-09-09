import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";

import clsx from "clsx";

// Material UI
import { makeStyles } from "@material-ui/styles";

import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Divider
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";


import amp from "../../../util/amplify/amp";


const useStyles = makeStyles( theme => ({
    columnHeading: {
        marginLeft: theme.spacing( 2 ),
        marginRight: theme.spacing( 2 )
    },
    flex: {
        flex: 1
    },
    searchColumnHeading: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchIcon: {
        marginTop: theme.spacing( 3 )
    }
}));

// Cube List column
export const CubeList = ({cubeList, droppableId}) => {

    const classes = useStyles();

    return (
        <div className={ classes.flex }>
            <Typography
                variant='h5'
                className={classes.columnHeading}
            >
                Cube List
            </Typography>

            <Divider className={classes.columnHeading} />

            <Droppable droppableId={droppableId}>
                { ( provided ) => (
                    <List ref={ provided.innerRef }>
                        {
                            cubeList.map( (element, index) => {
                                return(
                                    <Draggable
                                        draggableId={ `cube-list-${index}` }
                                        index={ index }
                                        key={ index }
                                    >
                                        { (provided) => (
                                            <ListItem
                                                ref={ provided.innerRef }
                                                { ...provided.draggableProps }
                                                { ...provided.dragHandleProps }
                                            >
                                                <ListItemText>
                                                    {element.cardId}
                                                </ListItemText>
                                            </ListItem>
                                        ) }
                                    </Draggable>
                                )
                            })
                        }
                        {provided.placeholder}
                    </List>
                ) }
            </Droppable>
        </div>
    )
};


// Workspace column
export const Workspace = ({workspaceList, droppableId}) => {

    const classes = useStyles();

    return (
        <div className={ classes.flex }>
            <Typography variant='h5' className={classes.columnHeading}>
                Workspace
            </Typography>

            <Divider className={classes.columnHeading} />

            <Droppable droppableId={droppableId}>
                {( provided ) => (

                    <List ref={provided.innerRef}>
                        {
                            workspaceList.map( (element, index) => {
                                return(
                                    <Draggable
                                        draggableId={ `workspace-list-${index}` }
                                        index={ index }
                                        key={ index }
                                    >
                                        { (provided) => (
                                            <ListItem
                                                ref={ provided.innerRef }
                                                { ...provided.draggableProps }
                                                { ...provided.dragHandleProps }
                                            >
                                                <ListItemText>
                                                    {element.cardId}
                                                </ListItemText>
                                            </ListItem>
                                        ) }
                                    </Draggable>
                                )
                            })
                        }
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </div>
    )
};


export const SearchColumn = ({droppableId}) => {

    const classes = useStyles();

    const handleSearchfield = async ( evt ) => {
        const searchTerm = evt.target.value;

        const res = await amp.SearchCard( searchTerm );
        console.log( res );
    };

    return (
        <div className={classes.flex}>
            {/*
            <Typography variant='h5' align='center'>
                Search
            </Typography>
            */}

            <div className={ clsx( classes.columnHeading, classes.searchColumnHeading ) }>
                <SearchIcon className={classes.searchIcon}/>
                <TextField
                    fullWidth
                    margin='none'
                    id='search-textfield'
                    label='Search'
                    onChange={ handleSearchfield }
                />
            </div>

            <Droppable
                droppableId={droppableId}
                isDropDisabled={true}
            >
                {( provided ) => (

                    <List ref={provided.innerRef}>
                        <Draggable
                            draggableId={'search-0'}
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
                            draggableId={'search-1'}
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
            </Droppable>
        </div>
    )
};