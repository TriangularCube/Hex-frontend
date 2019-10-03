import { useDispatch } from "react-redux";
import { setDatabase } from "../Redux/actionCreators";

const storageName = 'hex-card-database';

export default () => {

    const dispatch = useDispatch();

    // Fetch database from LocalStorage
    let database = localStorage.getItem( storageName );
    console.log( database );

    // If there is a stored database
    if( database ){
        dispatch( setDatabase( database ) );
    }

    // Try to fetch the latest database

};