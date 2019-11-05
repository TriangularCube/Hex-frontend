import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";

import networkCalls from "../../../util/networkCalls";

// https://github.com/slorber/react-async-hook
// Hook for debounced card search
export default ( searchFunction ) => {

    const [searchText, setSearchText] = useState( '' );

    const debouncedSearch = useConstant(
        () => AwesomeDebouncePromise( searchFunction, 1000 )
    );

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if( text.length < 1 ){
                return null;
            }
            return debouncedSearch( text, abortSignal );
        },
        [searchText]
    );

    return [
        searchText,
        setSearchText,
        search
    ];

};