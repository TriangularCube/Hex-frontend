import { useState } from "react";
import useCardDatabase from "../../../util/cardDatabase/useCardDatabase";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";

export default () => {

    const [searchText, setSearchText] = useState( '' );
    const cardDB = useCardDatabase();

    const debouncedSearch = useConstant(
        () => AwesomeDebouncePromise( cardDB.searchForCard, 1000 )
    );

    const search = useAsync(
        async () => {
            if( searchText.length < 1 ){
                return null;
            }
            return debouncedSearch( searchText );
        },
        [searchText]
    );

    return [
        searchText,
        setSearchText,
        search
    ];

};