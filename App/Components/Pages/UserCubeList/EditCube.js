import React, {useEffect} from "react";
import PropTypes from "prop-types";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import Paper from "@material-ui/core/Paper";

// Custom Components
import PageTitle from "../../Common/PageTitle";

const useStyles = makeStyles( theme => ({
    horizontalSplit: {
        display: 'flex',
        flexDirection: 'row'
    },
    main: {
        margin: 0,
        flex: '2 1'
    },
    searchColumn: {
        order: 2,
        flexGrow: 1,
        position: 'sticky',
        margin: 0,

        // Hide display under small
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    }
}));

function EditCube( props ){

    useEffect( () => {
        document.title = 'Cube A'; // TODO This should be based on cube name
    });

    const classes = useStyles();

    return(
        <>


            {/* Root div for max width */}
            <div className={classes.horizontalSplit}>
                {/* Main Column */}
                <main className={classes.main}>
                    <PageTitle>
                        Cube A
                    </PageTitle>

                    <Paper>
                        Cube A
                    </Paper>
                </main>

                {/* Search Column */}
                <div className={classes.searchColumn}>
                    <PageTitle>
                        Search
                    </PageTitle>
                    <Paper>
                        Something!
                    </Paper>
                </div>
            </div>

        </>
    );
}

EditCube.propTypes = {
    match: PropTypes.object.isRequired
};

export default EditCube;