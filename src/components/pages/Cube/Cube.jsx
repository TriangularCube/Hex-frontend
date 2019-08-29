import React, {useState} from "react";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import {
    Container,
    Grid,
    Paper,
    Tabs,
    Tab, Hidden
} from "@material-ui/core";

// Hex Components
import PageTitle from "../../common/PageTitle";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Cube = () => {

    const classes = useStyles();

    // Tab Support
    const [tabValue, setTabValue] = useState( 0 );

    const Description = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4} lg={3}>
                    <Paper className={classes.paper}>
                        <p>
                            Cube Page
                        </p>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8} lg={9}>
                    <Paper className={classes.paper}>
                        <p>
                            Cube Description
                        </p>
                    </Paper>
                </Grid>
            </Grid>
        )
    };

    const CubeListing = () => {
        return(
            <p>
                List
            </p>
        )
    };

    return(
        <Container maxWidth='lg'>
            <PageTitle>
                Cube Name
            </PageTitle>

            <Tabs
                value={tabValue}
                onChange={ (evt, newValue) => setTabValue(newValue) }
                aria-label='View Cube Tabs'
                variant='fullWidth'
            >
                <Tab label='Description' />
                <Tab label='List' />
            </Tabs>

            {
                tabValue === 0 ?
                    <Description />
                    :
                    <CubeListing />
            }

        </Container>
    )

};

export default Cube;