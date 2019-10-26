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


import useDebouncedSearch from "../../../util/useDebouncedSearch";


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


const CubeItems = ({provided, sourceList, listName}) => {

    // Map the output to list items
    let Output = sourceList.map( (element, index) => {
        return(
            <Draggable
                draggableId={ `${listName}-${index}` }
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
                            {element.id}
                        </ListItemText>
                    </ListItem>
                ) }
            </Draggable>
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
        <List ref={provided.innerRef}>
            {Output}
            {provided.placeholder}
        </List>
    )

};


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
                    <CubeItems
                        provided={provided}
                        sourceList={cubeList}
                        listName="cube-list"
                    />
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
                    <CubeItems
                        provided={provided}
                        sourceList={workspaceList}
                        listName="workspace"
                    />
                )}
            </Droppable>
        </div>
    )
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

    const results = search.result.result.data;

    const list = results.map( (element, index) => {
        return(
            <Draggable
                draggableId={`search-${index}`}
                index={index}
                key={index}
            >
                { ( provided, snapshot ) => {
                    return(
                        <>
                            <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <ListItemText
                                    primary={element.name}
                                />
                            </ListItem>
                            { snapshot.isDragging && (
                                <ListItem>
                                    {/* https://github.com/atlassian/react-beautiful-dnd/issues/216 */}
                                    {/* https://codesandbox.io/s/vertical-list-with-multiple-drop-targets-xqx8i */}
                                    <ListItemText
                                        primary={element.name}
                                        style={{
                                            '~ div': {
                                                transform: 'none!important',
                                                backgroundColor: '#ffffff'
                                            }
                                        }}
                                    />
                                </ListItem>
                            )}
                        </>
                    )
                }}
            </Draggable>
        )
    });

    return list;
};

export const SearchColumn = ({droppableId, setSearchResults}) => {

    const classes = useStyles();

    const [searchText, setSearchText, search] = useDebouncedSearch();

    // Pass the results back to CubeEdit
    if( !search.loading ){
        setSearchResults( search.result ? search.result.result.data : null );
    }

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