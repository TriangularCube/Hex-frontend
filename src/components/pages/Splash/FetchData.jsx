import PageLoading from "../../common/PageLoading";

const { useEffect } = React;
const { useHistory } = ReactRouterDOM;

import { useDispatch } from "react-redux";
import { setDatabase } from "../../../redux/actionCreators";

export default ( props ) => {

    // DEBUG Find if there is a referrer
    let referrer;
    if( props.location.state && props.location.state.referrer ){
        console.log( `Fetch referred from ${props.location.state.referrer}` );
        referrer = props.location.state.referrer;
    }
    if( referrer === '/fetch-data' ){
        // If for whatever reason the user stumbled onto this page by themselves
        referrer = '/';
    }

    const dispatch = useDispatch();
    const history = useHistory();

    // Initiate the Fetch
    useEffect( () => {
        const getData = async () => {
            try {
                // Try to fetch the latest database
                let res = await fetch( 'https://api.scryfall.com/bulk-data' );

                res = await res.json();

                // Only fetch Default Cards collection
                const dcObject = res.data.find( element => element.name === 'Default Cards' );

                if( !dcObject ){
                    // Error
                    console.error( 'Cannot find Default Cards' );
                    // TODO
                    return;
                }

                // Fetch the actual list
                // NOTE This is LARGE, so it takes a while
                res = await fetch( dcObject.permalink_uri );
                res = await res.json();

                // Save to memory (in Redux)
                dispatch( setDatabase( res ) );

            } catch( e ){
                console.error( 'Error fetching DB', e.message );
            }
        };
        getData().then( () => {
            // Redirect back to referrer
            history.replace( referrer );
            console.log( 'Redirecting back to referrer' );
        });
    }, [] );

    return (
        <>
            <p>
                Your browser does not support IndexedDB, Reverting to using in Memory database.
                You will be redirected back to your previous page shortly.
            </p>
            <PageLoading/>
        </>
    )

};