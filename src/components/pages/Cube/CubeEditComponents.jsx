import React, { useState } from "react";

import useConstant from "use-constant";
import { useAsyncAbortable } from "react-async-hook";
import AwesomeDebouncePromise from "awesome-debounce-promise";

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
    Divider, CircularProgress
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";


import networkCalls from "../../../util/networkCalls";





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


// https://github.com/slorber/react-async-hook
// Hook for debounced card search
const useDebouncedSearch = () => {

    const [searchText, setSearchText] = useState( '' );

    const debouncedSearch = useConstant(
        () => AwesomeDebouncePromise( networkCalls.SearchCard, 1000 )
    );

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if( text.length === 0 ){
                return null;
            }
            return debouncedSearch( text, abortSignal );
        },
        [searchText]
    );

    return [
        searchText,
        setSearchText,
        search
    ];

};

const SearchResults = ({search}) => {
    // Display loading spinner while loading
    if( search.loading ){
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </div>
        );
    }

    // If nothing
    if( !search.result ){
        return (
            <Typography>
                Please enter a search term
            </Typography>
        );
    }

    // If no cards found
    if( !search.result.success ){
        return (
            <Typography>
                No cards found for that search
            </Typography>
        );
    }

    console.log( search.result );

    const list = search.result.result.data.map( (element, index) => {
        return(
            <Draggable
                draggableId={`search-${index}`}
                index={index}
                key={index}
            >
                {provided => {
                    return(
                        <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <ListItemText
                                primary={element.name}
                            />
                        </ListItem>
                    )
                }}
            </Draggable>
        )
    });

    return list;
};

export const SearchColumn = ({droppableId}) => {

    const classes = useStyles();

    const [searchText, setSearchText, search] = useDebouncedSearch();

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
                    value={searchText}
                    onChange={ (evt) => setSearchText(evt.target.value) }
                />
            </div>

            <Droppable
                droppableId={droppableId}
                isDropDisabled={true}
            >
                {( provided ) => (

                    <List ref={provided.innerRef}>
                        <SearchResults search={search}/>
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </div>
    )
};