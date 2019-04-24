import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles/index";

import {Card, Typography, Grid, CardContent, Chip, CardActionArea, IconButton} from "@material-ui/core";
import {Edit as EditIcon} from "@material-ui/icons";

const styles = theme => ({

    card: {
        margin: 2,
    },
    content: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    contentPad: {
        padding: theme.spacing.unit * 2
    },
    cubeInfo: {
        flexGrow: 1
    },
    editButton: {
        textAlign: 'right'
    },
    chip: {
        height: 20
    }

});

class CubeCard extends React.PureComponent{

    render(){
        // TODO Shim
        const { classes } = this.props;
        return(

            // Grid item to be placed in a grid from parent
            <Grid item>

                {/* Display card, sharp corners */}
                <Card className={ classes.card } square={true}>

                    {/* I would normally put a CardContent here, but it doesn't seem like its needed */}

                    {/* Another grid inside the card*/}
                    <Grid item container spacing={8}>

                        {/* First item, the Left side of the card*/}
                        <Grid item className={classes.cubeInfo}>

                            {/* Action area, so the whole left side is clickable */}
                            <CardActionArea>

                                {/* Add back the padding normally in a CardContent */}
                                <div className={classes.contentPad}>

                                    {/* Cube Name! */}
                                    <Typography component="h5" variant="h5">
                                        This is a Cube Card!
                                    </Typography>

                                    {/* Cube Description! */}
                                    <Typography variant="subtitle1" color="textSecondary">
                                        This is a Cube Description!
                                    </Typography>

                                    {/* Chips for cube tags! May remove later TODO*/}
                                    <Chip className={classes.chip} color="primary" label="Tag!" />
                                </div>
                            </CardActionArea>
                        </Grid>

                        {/* Second Grid Item, for Buttons */}
                        <Grid item>

                            {/* The Edit Button, aligned to the right */}
                            <IconButton className={classes.editButton}>
                                <EditIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        )
    }

}

CubeCard.propTypes = {
    classes: PropTypes.object.isRequired
};


let withAddedStyle = withStyles( styles )( CubeCard );

export default withAddedStyle;