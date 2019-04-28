import React from "react";

// Material UI Components
import Grid from "@material-ui/core/Grid";

// Custom Components
import CubeCard from "./CubeCard";
import PageTitle from "../../Common/PageTitle";


const pageName = 'My Cubes';

class CubeList extends React.PureComponent{

    componentDidMount() {
        // Update Document Title
        document.title = pageName;
    }

    // TODO Fetch user cube list

    render(){
        return(

            <>
                <PageTitle>{pageName}</PageTitle>

                {/* Grid of Cube List */}
                <Grid container spacing={0} alignItems='stretch' direction='column' justify='flex-start'>



                    {/* TODO Replace with list of cubes from User*/}
                    <CubeCard/>
                    <CubeCard/>
                    <CubeCard/>

                </Grid>
            </>

        )
    }

}

export default CubeList;