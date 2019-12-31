import React from 'react';

// React DND
import { useDrag, useDrop } from "react-dnd";
import { cubeCard, searchCard, workspaceCard } from "../../../util/dnd/dragTypes";

// Clone Utility
import clone from "clone-deep";

// Material UI
import { Divider, ListItem, ListItemText, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

// Card Utilities
import { AddCardToCube } from "../../../util/cubeFunctions";

const useStyles = makeStyles( theme => ({
    container: {
        // position: 'absolute',
        flex: 2,
        // height: '60%',
        'overflow-y': 'auto'
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

export default ({cube, setCube}) => {

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

    const cubeList = cube.list;

    // TODO Display the Cube properly

    return (
        <div
            // Set class to have background color if Drag is hovering over and can accept drop
            className={ clsx( classes.container, isOver && canDrop && classes.isOver ) }

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