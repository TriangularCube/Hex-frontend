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


// Cube List column
export const CubeList = ({cubeList}) => {

    const classes = useStyles();

    const [{isOver, canDrop}, drop] = useDrop({
        accept: [searchCard, workspaceCard],
        drop: item => { console.log( 'Drop Action', item ) },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

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

            <CubeItems
                sourceList={cubeList}
                listName="cube-list"
            />
        </div>
    )
};


// Workspace column
export const Workspace = ({workspaceList}) => {

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

    console.log( 'Search result', search.result );

    const results = search.result.result.data;
    const classes = useStyles();

    return results.map( (element, index) => {
        const [{isDragging}, drag] = useDrag({
            item: {
                name: element.name,
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

export const SearchColumn = ({setSearchResults}) => {

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