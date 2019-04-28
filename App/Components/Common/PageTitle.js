import React from "react";

// Material UI Utils
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI Components
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit}px`
    }
});

function PageTitle( props ){
    return(
        <Typography className={props.classes.root} color='textPrimary' variant='h4'>
            {props.children}
        </Typography>
    )
}

export default withStyles(styles)( PageTitle );