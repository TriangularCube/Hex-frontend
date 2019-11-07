import { storeName, lastUpdatedKeyName, open } from "./dbUtil";


// Take incoming messages
onmessage = (e) => {
    const cmd = e.data;
    console.log( cmd );
};