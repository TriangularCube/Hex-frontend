import React, { useEffect } from "react";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";

// Icons
import EditIcon from "@material-ui/icons/Edit";

// Custom Components
import PageTitle from "../../Common/PageTitle";


const pageName = 'My Cubes';


function UserCubeList(){

    // Document Title
    useEffect( () => {
        document.title = pageName;
    }, [] );

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


const useStyles = makeStyles( theme => ({

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
        padding: theme.spacing( 2 )
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

}));

function CubeCard(){

    const classes = useStyles();

    return(

        // Grid item to be placed in a grid from parent
        <Grid item>

            {/* Display card, sharp corners */}
            <Card className={ classes.card }>

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

                            <IconButton className={classes.editButton}>
                                <EditIcon />
                            </IconButton>

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

export default UserCubeList;