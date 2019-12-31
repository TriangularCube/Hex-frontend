import React from "react";

// React DND
import { useDrag } from "react-dnd";

// Material UI
import { CircularProgress,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

// Card Utilities
import { searchCard } from "../../../util/dnd/dragTypes";
import useDebouncedSearch from "./useDebouncedSearch";

const useStyles = makeStyles( theme => ({
    searchColumnHeading: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchIcon: {
        marginTop: theme.spacing( 3 )
    },
}));


export default () => {

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