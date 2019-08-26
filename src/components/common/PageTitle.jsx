import React from "react";

// Material UI Utils
import { makeStyles } from "@material-ui/styles";

// Material UI Components
import { Typography } from "@material-ui/core";

const useStyles = makeStyles( theme => ({
    root: {
        margin: `${theme.spacing( 2 )}px 0 ${theme.spacing( 1 )}px`
    }
}));

const PageTitle = ( props ) => {
    const classes = useStyles();
    return(
        <Typography className={classes.root} color='textPrimary' variant='h4'>
            {props.children}
        </Typography>
    )
};

export default PageTitle;