import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {Card, Typography, Grid, CardContent, Chip} from "@material-ui/core";

const styles = theme => ({

    card: {
        margin: theme.spacing.unit / 2,
    },
    content: {
        padding: theme.spacing.unit * 2,
        "&:last-child": {
            paddingBottom: theme.spacing.unit * 2
        }
    },
    chip: {
        height: 20
    }

});

class CubeCard extends React.PureComponent{

    render(){
        const { classes } = this.props;
        return(

            <Grid item>
                <Card className={ classes.card } square={true}>
                    <CardContent className={ classes.content }>
                        <Typography component="h5" variant="h5">
                            This is a Cube Card!
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            This is a Cube Description!
                        </Typography>
                        <Chip className={classes.chip} color="primary" label="Tag!" />
                    </CardContent>
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