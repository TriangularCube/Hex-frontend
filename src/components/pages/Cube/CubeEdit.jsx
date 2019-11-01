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

import { SearchAndEdit } from "./CubeEditComponents";


// DEBUG
import testCube from "../../../../debug/cubeTestData";


const useStyles = makeStyles( theme => ({
    page: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingRight: theme.spacing( 3 ),
        paddingLeft: theme.spacing( 3 )
    },
    contextSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // height: '100%',
        // width: '80%'
    }
}));


const CubeEdit = ( props ) => {

    // region Hooks and initial properties, Fetch cube

    // Cube handle
    const handle = props.match.params.handle;

    // This is to check...user status?
    const user = useCheckUser( props.history, `/cube/${handle}/edit` );

    const classes = useStyles();

    // Tabs
    // FIXME
    const [tabValue, setTabValue] = useState( 1 );

    const [loadingCube, setLoading] = useState( true );
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

    // Back out if loading
    if( loadingCube ){
        return <PageLoading />;
    }

    if( error ){
        // DEBUG
        console.error( 'Error getting cube, message: ', error );

        // TODO
        return null;
    }



    // DEBUG
    console.log( 'Cube: ', cube );
    console.log( 'User: ', user );

    // FIXME This is maybe too naive an implementation?
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

    // region Search result and Cube List manipulation

    // Search results don't survive changing tabs
    // TODO Figure out a way to persist search across tab change
    let searchResults = null;
    const setSearchResults = (results) => {
        searchResults = results;
    };

    // endregion

    // region Display all Tabs
    const TabDisplay = () => {
        switch ( tabValue ) {
            case 0:
                // TODO
                return null;
            case 1:
                return <SearchAndEdit cube={cube} />;
            case 2:
                return null;
            case 3:
                return null;
            default:
                console.error( 'Tab request unknown' );
                return null;
        }
    };
    // endregion

    return(
        <div className={classes.page}>
            {/* TODO Change this to custom implementation with editable title */}
            <PageTitle>
                {cube.name}
            </PageTitle>

            <Tabs
                value={tabValue}
                onChange={ (evt, newValue) => setTabValue( newValue ) }
                aria-label='View Editing Tabs'
                variant='fullWidth'
            >
                <Tab label='Description' />
                <Tab label='Search' />
                <Tab label='Workspace' />
                <Tab label='Update' />
            </Tabs>

            <Divider />

            <div className={classes.contextSection}>

                <DndProvider backend={HTML5Backend}>
                    <TabDisplay/>
                </DndProvider>

            </div>
        </div>
    )
};

export default CubeEdit;