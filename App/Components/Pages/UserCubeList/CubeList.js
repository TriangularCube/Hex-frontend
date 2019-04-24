import React from 'react';
import PropTypes from 'prop-types';

// Material UI Utils
import withStyles from '@material-ui/core/styles/withStyles';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom Components
import CubeCard from './CubeCard';



const styles = theme => ({
    root: {
        //padding: theme.spacing.unit * 2,
        maxWidth: '900px',
        margin: '2vh auto'
    },
    title: {
        margin: '20px 5px 10px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        width: '100%'
    }
});


class CubeList extends React.PureComponent{

    componentDidMount() {
        // Update Document Title
        document.title = 'Your Cubes';
    }

    // TODO Fetch user cube list

    render(){
        const { classes } = this.props;
        return(

            <>
                {/* Grid of Cube List */}
                <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start' className={classes.root}>

                    {/* Page Title */}
                    <Typography className={ classes.title } color="textPrimary" variant="h4" component="h2">Your Cubes</Typography>

                    {/* TODO Replace with list of cubes from User*/}
                    <CubeCard/>
                    <CubeCard/>
                    <CubeCard/>

                </Grid>
            </>

        )
    }

}


CubeList.propTypes = {
    classes: PropTypes.object.isRequired
};

let withAddedStyle = withStyles(styles)(CubeList);
export default withAddedStyle;