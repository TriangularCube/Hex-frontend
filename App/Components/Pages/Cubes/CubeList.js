import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {Grid, Typography} from '@material-ui/core';

import Navbar from '../../Navbar/Navbar';
import CubeCard from './CubeCard';

const pageName = 'My Cubes'

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
        document.title = pageName;
    }

    render(){
        const { classes } = this.props;
        return(

            <>
                <Navbar pageName={pageName} />
                <div style={{ height: 30 }} />
                <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start' className={classes.root}>

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