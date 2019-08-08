import React, { useEffect } from "react";

// Material UI
import {Card, Grid, Typography} from "@material-ui/core";

// Components
import PageTitle from "../../Common/PageTitle";



const CubeCard = ( props ) => {

    return(

        <Grid item>
            <Card>
                <Typography>
                    Yo
                </Typography>
            </Card>
        </Grid>

    );

};


const pageName = 'My Cubes';

const MyCubes = () => {

    // First, set the page name
    useEffect( () => {
        document.title = pageName;

        // TODO Fetch user's cubes
    }, [] );

    return(
        <>
            <PageTitle>
                {pageName}
            </PageTitle>

            {/* Grid of Cube List */}
            <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start'>
                <CubeCard/>
            </Grid>
        </>
    );

};

export default MyCubes;