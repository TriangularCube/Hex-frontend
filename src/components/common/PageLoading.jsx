import { makeStyles } from "@material-ui/styles";

import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
    center: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        // This makes the display inside Site-Content work
        height: '100%'
    }
});

const PageLoading = () => {

    const classes = useStyles();

    return (

        <div className={classes.center}>
            <CircularProgress/>
        </div>

    )

};

export default PageLoading;