import React from "react";

import { useAsync } from "react-async-hook";

// Redux
import { useSelector } from "react-redux";

// Amp
import amp from "../../../util/amplify/amp";

// Hex components
import PageLoading from "../../common/PageLoading";

const CubeEdit = ( props ) => {

    const handle = props.match.params.handle;

    const user = useSelector( state => state.user );

    const asyncGetCube = useAsync( async () => {
        return await amp.GetWithAuth( `/cube/${handle}` );
    }, [] );

    if( asyncGetCube.loading ){
        return <PageLoading />
    }

    //region Errors
    if( asyncGetCube.error ){
        // DEBUG
        console.error( 'Error getting cube, message: ', asyncGetCube.error );

        // TODO
        return null;
    }

    if( !asyncGetCube.result.success ){
        // DEBUG
        console.error( 'Error fetching cube from server, server message: ', asyncGetCube.result.error );

        // TODO
        return null;
    }
    //endregion

    const cube = asyncGetCube.result.cube;

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

    return(
        <p>
            Edit Cube!
        </p>
    )
};

export default CubeEdit;