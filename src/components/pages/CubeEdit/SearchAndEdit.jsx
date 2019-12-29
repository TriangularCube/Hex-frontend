import React from "react";

// React DND
import { useDrag, useDrop } from "react-dnd";
import { cubeCard, searchCard, workspaceCard } from "../../../util/dnd/dragTypes";

// Clone
import clone from 'clone-deep';

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

import clsx from "clsx";

// Debounce
import useDebouncedSearch from "./useDebouncedSearch";

// Cube Utils
import { AddCardToCube, AddCardToWorkspace } from "../../../util/cubeFunctions";


const useStyles = makeStyles( theme => ({
    columnHeading: {
        marginLeft: theme.spacing( 2 ),
        marginRight: theme.spacing( 2 )
    },
    searchColumnHeading: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchIcon: {
        marginTop: theme.spacing( 3 )
    },

    // General Flex property
    flex: {
        flex: 1
    },

    // Drag Styles
    isOver: {
        backgroundColor: 'blue'
    },
    canGrab: {
        cursor: 'grab'
    },
    isDragging: {
        opacity: 0.5
    }
}));

//region Cube List section
export const CubeList = ({cube, setCube}) => {

    const classes = useStyles();

    // Drop setup
    const [{isOver, canDrop}, drop] = useDrop({
        accept: [searchCard, workspaceCard],
        drop: item => {

            // Deep cloning required here
            const cubeClone = clone( cube );
            AddCardToCube( cubeClone, item );
            setCube( cubeClone );

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    const cubeList = cube.cubeList.default;

    // TODO Display the Cube properly

    return (
        <div
            // Set class to have background color if Drag is hovering over and can accept drop
            className={ clsx( classes.flex, isOver && canDrop && classes.isOver ) }

            // Drop reference
            ref={drop}
        >
            {/* TODO There might need to be some spacing here */}
            <Typography
                variant='h5'
                className={classes.columnHeading}
            >
                Cube List
            </Typography>

            <Divider className={classes.columnHeading} />

            {
                cubeList.map( (card, index) => {
                    // Drag setup
                    const [{isDragging}, drag] = useDrag({
                        item: {
                            name: card.data.name,
                            id: card.id,
                            type: cubeCard
                        },
                        collect: monitor => ({
                            isDragging: monitor.isDragging()
                        })
                    });

                    return (
                        <ListItem
                            key={`Cube-List-${index}`}
                            ref={drag}

                            className={ clsx( classes.canGrab, isDragging && classes.isDragging ) }
                        >
                            <ListItemText>
                                {/* TODO */}
                                { card.data.name }
                            </ListItemText>
                        </ListItem>
                    )
                })
            }
        </div>
    )
};
//endregion

//region Search Section
const SearchResults = ({ search }) => {

    // Display loading spinner while loading
    if( search.loading ){
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </div>
        );
    }

    if( search.error ){
        console.log( search.error );
    }

    // If nothing
    if( !search.result ){
        return (
            <Typography>
                Please enter a search term
            </Typography>
        );
    }

    const result = search.result;

    // If no cards found
    if( result.length < 1 ){
        return (
            <Typography>
                No cards found for that search
            </Typography>
        );
    }

    const classes = useStyles();

    return result.map( (element, index) => {
        const [{isDragging}, drag] = useDrag({
            item: {
                name: element.name,
                id: element.id,
                type: searchCard
            },
            collect: monitor => ({
                isDragging: monitor.isDragging()
            })
        });

        return(
            <ListItem
                // TODO Change index to something actually meaningful
                key={index}
                ref={drag}

                // CanGrab is just setting the Cursor, otherwise set opacity for dragging
                className={ clsx( classes.canGrab, isDragging && classes.isDragging ) }
            >
                <ListItemText
                    primary={element.name}
                />
            </ListItem>
        )
    });

};

export const SearchColumn = () => {

    const classes = useStyles();

    const [searchText, setSearchText, search] = useDebouncedSearch();

    return (
        <div className={classes.flex}>
            {/*
            <Typography variant='h5' align='center'>
                Search
            </Typography>
            */}

            <div className={ classes.searchColumnHeading }>
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

            <List>
                <SearchResults search={search}/>
            </List>
        </div>
    )
};
//endregion

//region Workspace Section
export const Workspace = ({cube}) => {

    const classes = useStyles();

    // Drop setup
    const [{isOver, canDrop}, drop] = useDrop({
        accept: [searchCard, cubeCard],
        drop: item => AddCardToWorkspace( cube, item ),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    return (
        <div
            // Set class to have background color if Drag is hovering over and can accept drop
            className={ clsx( classes.flex, isOver && canDrop && classes.isOver ) }

            // Drop Reference
            ref={drop}
        >
            <Typography variant='h5' className={classes.columnHeading}>
                Workspace
            </Typography>

            <Divider className={classes.columnHeading} />

            { (() => {
                // Map the workspace list
                let Output = cube.workspace.map( (element, index) => {

                    // Drag setup
                    const [{isDragging}, drag] = useDrag({
                        item: {
                            name: element.name,
                            id: element.id,
                            type: workspaceCard
                        },
                        collect: monitor => ({
                            isDragging: monitor.isDragging()
                        })
                    });

                    return(
                        <ListItem
                            key={`Workspace-List-${index}`}
                            ref={drag}

                            className={ clsx( classes.canGrab, isDragging && classes.isDragging ) }
                        >
                            <ListItemText>
                                {element.id}
                            </ListItemText>
                        </ListItem>
                    )
                });

                // If there are no items in the array, use placeholder
                // without placeholder, there's a very small space for the drop target
                if( Output.length === 0 ){
                    Output =
                        <ListItem>
                            <ListItemText>
                                Please add cards here
                            </ListItemText>
                        </ListItem>;
                }

                return (
                    <List>
                        {Output}
                    </List>
                )
            })() }
        </div>
    )
};
//endregion
