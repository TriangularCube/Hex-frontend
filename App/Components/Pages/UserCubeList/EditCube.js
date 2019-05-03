import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import Paper from "@material-ui/core/Paper";

// Custom Components
import PageTitle from "../../Common/PageTitle";

// Util
import Cube from "/Data/Cube";
import * as fetchState from '/Data/FetchState';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles( theme => ({
    horizontalSplit: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    main: {
        margin: 0,
        flex: '2 1'
    },
    searchColumn: {
        order: 2,
        flexGrow: 1,
        position: 'sticky',
        top: 70,
        margin: 0,

        // Hide display under small
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    }
}));

function EditCube( props ){

    // Get the match prop so we can fetch the cube ID
    const { matches } = props;

    // Fetch Status
    const [fetchStatus, setFetch] = useState( fetchState.FETCH );

    // The current Cube
    const [ currentCube, setCube ] = useState( new Cube );

    // Fetch the cube from server
    useEffect( () => {
        // TODO Get cube
        setFetch( fetchState.FETCH );

        /* Don't need this right now
        fetch( process.env.API_URL + 'cube/0' )

            .then( (res) => {
                if( res.ok ){
                    return new Promise( resolve => setTimeout( () => resolve(res), 1000 ) );
                }
                throw new Error( 'Network response error' );
            })
            .then( (res) => {
                return res.json();
            })
            .then( ( json ) => {
                setCube( new Cube( json ) );
                setFetch( fetchState.DONE );
            })
            .catch( (error) => {
                setFetch( fetchState.ERROR );
                console.log( error.message );
            });
            */

        // TODO remove this later
        setCube( new Cube(
            {
                name: 'First Cube!'
            }
        ) );
        setFetch( fetchState.DONE );
    }, [] );

    useEffect( () => {
        document.title = currentCube.name || "Loading...";
    }, [currentCube] );

    const classes = useStyles();

    const CubeSection = () => {
        return(
            <Paper>

            </Paper>
        )
    };

    const createList = (children) => {
        let list = [];
        for( let i = 0; i < 60; i++){
            list.push( <Paper key={i}>{children}</Paper> )
        }
        return list;
    };

    if( fetchStatus === fetchState.FETCH ){
        return (
            <Typography>
                Loading...
            </Typography>
        )
    } else if( fetchStatus === fetchState.DONE ){
        return(
            <>
                {/* Root div for max width */}
                <div className={classes.horizontalSplit}>
                    {/* Main Column */}
                    <main className={classes.main}>
                        <PageTitle>
                            {currentCube.name}
                        </PageTitle>

                        {createList('Cube A')}

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

}

EditCube.propTypes = {
    match: PropTypes.object.isRequired
};

export default EditCube;