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
    // Cube List


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


//region Workspace Section

//endregion
