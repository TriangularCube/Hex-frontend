import React, {useEffect} from "react";
import PropTypes from "prop-types";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles/index";

// Material UI Components
import Typography from "@material-ui/core/Typography/index";
import Paper from "@material-ui/core/Paper/index";

// Custom Components
import PageTitle from "../../Common/PageTitle";

const useStyles = makeStyles( theme => ({
    horizontalSplit: {
        display: 'flex'
    },
    main: {
        margin: 0,
        flex: '1 1 70%'
    },
    searchColumn: {
        order: 2,
        width: '150px',
        flexShrink: 0,
        position: 'sticky',
        margin: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}));

function EditCube(){

    const classes = useStyles();

    useEffect( () => {
        document.title = 'Cube A'; // TODO This should be based on cube name
    });

    return(
        <>
            <PageTitle>
                Cube A
            </PageTitle>

            {/* Root div for max width */}
            <div className={classes.horizontalSplit}>

                {/* Search Column */}
                <div className={classes.searchColumn}>
                    <Paper>
                        Something!
                    </Paper>
                </div>

                {/* Main Column */}
                <main className={classes.main}>
                    <Paper>
                        Cube A
                    </Paper>
                </main>
            </div>
        </>
    )

}

EditCube.propTypes = {
    match: PropTypes.object.isRequired
};

export default EditCube;