import React from "react";
import PropTypes from "prop-types";

// Material UI Utils
import withStyles  from "@material-ui/core/styles/withStyles";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Custom Components
import PageTitle from "../../Common/PageTitle";

const styles = (theme) => ({
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
});

class DisplayCube extends React.PureComponent{

    render(){
        const { match, classes } = this.props;

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

}

DisplayCube.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default withStyles(styles)( DisplayCube );