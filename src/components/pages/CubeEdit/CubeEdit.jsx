import React from "react";

const { useState, useEffect } = React;

// Amp
import networkCalls from "../../../util/networkCalls";

// React DND
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import {
    Divider,
    Tabs,
    Tab
} from "@material-ui/core";

// Hex components
import PageLoading from "../../common/PageLoading";
import PageTitle from "../../common/PageTitle";
import useCheckUser from "../../../util/useCheckUser";

import CubeDisplay from "./CubeDisplay";
import SearchDisplay from "./SearchDisplay";
import WorkspaceDisplay from "./WorkspaceDisplay";


// DEBUG
import testCube from "../../../../debug/cubeTestData";


import { getCard } from "../../../util/cardDatabase/cardDatabase";


const useStyles = makeStyles( theme => ({
    // Context section is the whole page after the Cube Name and Spacer
    contextSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // height: '100%',
        // width: '80%'
    },

    // Left side houses List and Workspace
    leftSide: {
        // position: 'absolute',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },

    // Right Side houses Changelist and Search
    rightSide: {
        marginTop: 16,
        width: 450,
        display: 'flex',
        flexDirection: 'row'
    },

    page: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingRight: theme.spacing( 3 ),
        paddingLeft: theme.spacing( 3 ),
        display: 'flex',
        flexDirection: 'column'
    },

}));


const CubeEdit = ( props ) => {

    // region Hooks and initial properties, Fetch cube

    // Cube handle
    // TODO Switch to hook
    const handle = props.match.params.handle;

    // This is to check...user status?
    const user = useCheckUser( props.history, `/cube/${handle}/edit` );

    const classes = useStyles();

    // Tabs
    const [tabValue, setTabValue] = useState( 1 );

    const [loadingCube, setLoading] = useState( true );

    // DEBUG
    const [cube, setCube] = useState( testCube );

    const [error, setError] = useState( null );


    // Fetch the cube
    // TODO implement some sort of transfer from MyCubes possibly

    // DEBUG
    /*
    useEffect( () => {
        networkCalls.GetWithAuth( `/cube/${handle}` )
            .then( (res) => {

                if( !res.success ){
                    setError( 'Unsuccessful retrieval, ', res.error );
                } else {
                    // DEBUG TODO
                    // setCube( res.data );
                    console.log( 'Got data from server: ', res.data );
                }

            }).catch( (err) => {
                setError( err.message );
            }).finally( () => setLoading( false ) );
    }, [] );
    */

    // DEBUG
    // Fetch all cube cards from DB
    useEffect( () => {
        // Promisify all of cube prepping
        Promise.all(
            // Map all of cube
            cube.list.map( async (element,index) => {
                // So that we get the card from DB
                cube.list[index].data = await getCard(element);
            })
        ).then( () => {
            // This doesn't really need to be here
            console.log( 'Done prepping cube.', cube.list );
        }).catch( err => {
            // Catch errors, obviously
            console.error( err );
            setError( true );
        }).finally( () => {
            // Finally, display the page
            setLoading( false );
        })
    }, [] );

    // TODO Back out if loading
    if( loadingCube ){
        return <PageLoading />;
    }

    if( error ){
        // DEBUG
        console.error( 'Error getting cube, message: ', error );

        // TODO
        return null;
    }


    /*
    // DEBUG
    console.log( 'Cube: ', cube );
    console.log( 'User: ', user );

    // FIXME This check really should be done Server Side
    if( cube.owner.displayName !== user.displayName ){
        console.error( 'Owner of Cube and current user do not match' );

        // TODO
        return (
            <p>
                User and Cube Owner mismatch
            </p>
        )
    }
    */

    //endregion

    // NOTE Apparently I need to explicitly re-make the two lists when the cube changes
    //  since I use hooks
    let Cube = () => <CubeDisplay cube={cube} setCube={setCube} />;
    let Workspace = () => <WorkspaceDisplay cube={cube} setCube={setCube} />;

    return(
        <div className={classes.page}>
            {/* TODO Change this to custom implementation with editable title */}
            <PageTitle>
                {cube.name}
            </PageTitle>


            <Divider />

            {/* Spacer */}
            <div style={{ height: 10 }} />

            <div className={classes.contextSection}>

                <DndProvider backend={HTML5Backend}>
                    <>
                        <div className={classes.leftSide}>
                            {/* Left side takes up much of the screen, and
                                includes the Cube List and Workspace List*/}

                            <Cube/>

                            <Workspace/>
                        </div>


                        {/* Div here to arrange the Search and Workspace properly */}
                        <div className={classes.rightSide}>
                            <SearchDisplay/>

                        </div>
                    </>
                </DndProvider>

            </div>
        </div>
    )
};

export default CubeEdit;