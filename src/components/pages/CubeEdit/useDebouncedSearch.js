import { useState } from "react";
import { searchUsingTerm } from "../../../util/cardDatabase/cardDatabase";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsyncAbortable } from "react-async-hook";

export default () => {

    const [searchText, setSearchText] = useState( '' );

    // console.log( searchText );

    const debouncedSearch = useConstant(
        () => AwesomeDebouncePromise( searchUsingTerm, 1000 )
    );

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if( searchText.length < 1 ){
                return null;
            }
            return debouncedSearch( abortSignal, text );
        },
        [searchText]
    );

    return [
        searchText,
        setSearchText,
        search
    ];

};