import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from "./App/Redux/store";

import App from "./App/App";

class Index extends React.Component{

    constructor(props){
        super(props);

        // Load fonts
        WebFont.load({
            google: {
                families: [ 'Roboto:300,500,700' ]
            }
        });

    }

    render(){
        return(

            <Provider store={store}>
                <App />
            </Provider>

        )
    }

}

ReactDOM.render( <Index />, document.getElementById( 'root' ) );