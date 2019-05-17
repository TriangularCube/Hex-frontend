import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import Paper from "@material-ui/core/Paper";

// Custom Components
import PageTitle from "../../Common/PageTitle";

// Util
import Cube from "~/Data/Cube";
import * as fetchState from "~/Data/FetchState";
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
    const [fetchStatus, setFetch] = useState( fetchState.NONE );

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
        const fetchCube = async () => {
            let someCube = await import( '~/Data/mock/testCube' );

            setCube( new Cube( someCube.default ) );
            setFetch( fetchState.DONE );
        };

        fetchCube()
            .catch( ( error ) => {
                setFetch( fetchState.ERROR );
                console.log( error );
            })
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

    // TODO debug
    const createList = (children) => {
        let list = [];
        for( let i = 0; i < 60; i++){
            list.push(
                <Typography key={i}>
                    {children}
                </Typography>
            )
        }
        return list;
    };

    switch ( fetchStatus ) {
        case fetchState.NONE:
            return (
                <Typography>
                    Waiting for page to load
                </Typography>
            );
        case fetchState.FETCH:
            return (
                <Typography>
                    Fetching Data...
                </Typography>
            );
        case fetchState.DONE:
            return(
                <>
                    {/* Root div for max width */}
                    <div className={classes.horizontalSplit}>
                        {/* Main Column */}
                        <main className={classes.main}>
                            <PageTitle>
                                {currentCube.name}
                            </PageTitle>

                            <Paper>
                                {createList('Cube A')}
                            </Paper>

                        </main>

                        {/* Search Column */}
                        <div className={classes.searchColumn}>
                            <PageTitle>
                                Search
                            </PageTitle>
                            <div>
                                Something!
                            </div>
                        </div>
                    </div>

                </>
            );
        case fetchState.ERROR:
            return (
                <Typography>
                    An error has occurred
                </Typography>
            )
    }

}

EditCube.propTypes = {
    match: PropTypes.object.isRequired
};

export default EditCube;