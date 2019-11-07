import { useEffect, useState } from "react";
import useCardDatabase from "../../../util/cardDatabase/useCardDatabase";

import AwesomeDebouncePromise from "awesome-debounce-promise";
const debouncedSearch = AwesomeDebouncePromise(async ( searchText, setLoading, setResult, searchForCard ) => {
        setLoading( true );
        const res = await searchForCard( searchText );

        setResult( res );
        setLoading( false );
    },
    1000
);

export default () => {

    const [searchText, setSearchText] = useState( '' );
    const [loading, setLoading] = useState( false );
    const [result, setResult] = useState( [] );

    const cardDB = useCardDatabase();

    useEffect( () => {
        debouncedSearch( searchText, setLoading, setResult, cardDB.searchForCard )();
    }, [searchText] );


    return [
        searchText,
        setSearchText,
        loading,
        result
    ];

};