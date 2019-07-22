import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./Redux/store";

import App from "./App";

WebFont.load({
    google: {
        families: [ 'Roboto:300,500,700' ]
    }
});

// Configure Amplify
import { targetName, configStage, DEV } from "./Amplify-Config";

const target = localStorage.getItem( targetName );
configStage( target === null ? DEV : target );

function Index(){
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render( <Index />, document.getElementById( 'root' ) );