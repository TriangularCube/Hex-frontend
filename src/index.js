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
import "./Amplify-Config";

function Index(){
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render( <Index />, document.getElementById( 'root' ) );