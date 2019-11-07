const { useState } = React;

// React DND
import { useDrag, useDrop } from "react-dnd";
import { cubeCard, searchCard, workspaceCard } from "../../../util/dnd/dragTypes";

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

import useCardDatabase from "../../../util/cardDatabase/useCardDatabase";



const useStyles = makeStyles( theme => ({
    // Right area of Search and Edit Tab
    rightArea: {
        marginTop: 16,
        width: 400,
        display: 'flex',
        flexDirection: 'row'
    },


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


export default ({cube}) => {

    const classes = useStyles();

    return (
        <>
            {/* CubeList should take up most of the screen */}
            <CubeList cube={cube} />

            {/* Div here to arrange the Search and Workspace properly */}
            <div className={classes.rightArea}>
                <SearchColumn/>
                <Workspace workspaceList={cube.lists.workspace} />
            </div>
        </>
    );
};

const CubeList = ({cube}) => {
// Cube List column

    const classes = useStyles();

    const [{isOver, canDrop}, drop] = useDrop({
        accept: [searchCard, workspaceCard],
        drop: item => cube.addCardToCube( item ),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    const cubeList = cube.lists.cube;

    return (
        <div
            // Set class to have background color if Drag is hovering over and can accept drop
            className={ clsx( classes.flex, isOver && canDrop && classes.isOver ) }

            // Drop reference
            ref={drop}
        >
            <Typography
                variant='h5'
                className={classes.columnHeading}
            >
                Cube List
            </Typography>

            <Divider className={classes.columnHeading} />

            {
                cubeList.map( (element, index) => {
                    return (
                        <ListItem key={`Cube-List-${index}`}>
                            <ListItemText>
                                {/* TODO */}
                                {
                                    element.name ?
                                        element.name
                                        :
                                        element.id
                                }
                            </ListItemText>
                        </ListItem>
                    )
                })
            }
        </div>
    )
};


const SearchResults = ({ loading, result }) => {

    // Display loading spinner while loading
    if( loading ){
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </div>
        );
    }

    console.log( 'Search Result', result );

    // If nothing
    if( !result ){
        return (
            <Typography>
                Please enter a search term
            </Typography>
        );
    }

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

const SearchColumn = () => {

    const classes = useStyles();

    const [searchText, setSearchText, loading, result] = useDebouncedSearch();

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
                <SearchResults loading={loading} result={result}/>
            </List>
        </div>
    )
};


const CubeItems = ({sourceList}) => {

    // Map the output to list items
    let Output = sourceList.map( (element, index) => {
        return(
            <ListItem key={index}>
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

};




// Workspace column
const Workspace = ({workspaceList}) => {

    const classes = useStyles();

    return (
        <div className={ classes.flex }>
            <Typography variant='h5' className={classes.columnHeading}>
                Workspace
            </Typography>

            <Divider className={classes.columnHeading} />

            <CubeItems
                sourceList={workspaceList}
            />
        </div>
    )
};




