import React, { useState } from "react";
import API from "@aws-amplify/api";

// Material UI
import Button from "@material-ui/core/Button";


function FaunaTest(){

    const [cursor, setCursor] = useState();

    async function call(){
        const res = await API.get( 'hex', 'users' );
        setCursor( res );
    }

    async function call2(){
        const res = await API.get( 'hex', 'users', {
            queryStringParameters: {
                after: cursor
            }
        });
        console.log( res );
    }

    function display(){
        console.log( cursor );
    }

    return(
        <>
            <Button onClick={call}>
                Call API
            </Button>
            <Button onClick={call2}>
                Call API 2
            </Button>
            <Button onClick={display}>
                Display Cursor
            </Button>
        </>
    )

}

export default FaunaTest;