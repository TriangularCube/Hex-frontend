import React from "react";

// Material UI
import { Divider, List, ListItem, ListItemText, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

// React DND
import { useDrag, useDrop } from "react-dnd";

import { cubeCard, searchCard, workspaceCard } from "../../../util/dnd/dragTypes";
// Card Utilities

import { AddCardToWorkspace } from "../../../util/cubeFunctions";

const useStyles = makeStyles( theme => ({
    container: {
        flex: 1
    },

    // TODO Drag Styles may be duplicated across Components
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
            className={ clsx( classes.container, isOver && canDrop && classes.isOver ) }

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