import { useSelector } from "react-redux";

export default (history, referrer) => {
    const user = useSelector( state => state.user );
    if( !user ){
        history.push( '/login', { referrer } )
    } else {
        return user;
    }
};