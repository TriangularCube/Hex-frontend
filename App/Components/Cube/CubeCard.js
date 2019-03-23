import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {Card, Typography, Grid, Paper, CardContent} from "@material-ui/core";

const styles = theme => ({

    card: {
        margin: theme.spacing.unit,

        textAlign: 'center',
        //margin: 'auto'
    }

});

class CubeCard extends React.Component{

    render(){
        const { classes } = this.props;
        return(

            <Grid item>
                <Card className={ classes.card }>
                    <CardContent>
                        <Typography paragraph>
                            This is a Cube Card!
                        </Typography>
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