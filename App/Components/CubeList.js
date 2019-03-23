import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import { Grid, Paper } from '@material-ui/core';

import CubeCard from './Cube/CubeCard';



const styles = theme => ({
    root: {
        //padding: theme.spacing.unit * 2,
        width: '80%',
        marginTop: '2vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '2vh'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        width: '100%'
    }
});


class CubeList extends React.Component{

    render(){
        const { classes } = this.props;
        return(

            <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start' className={classes.root}>

                    <CubeCard/>
                    <CubeCard/>
                    <CubeCard/>

            </Grid>

        )
    }

}


CubeList.propTypes = {
    classes: PropTypes.object.isRequired
};

let withAddedStyle = withStyles(styles)(CubeList);
export default withAddedStyle;