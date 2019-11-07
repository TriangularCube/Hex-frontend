import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Loadable
import loadable from "@loadable/component";

const EditCubePage = loadable( () => import( "./components/pages/MyCubes/CubeEdit" ) );

// Card database
import useCardDB from "./util/useDB/useCardDatabase";


const App = () => {
    useCardDB();
    return(
        <Router>
            <Switch>
                <Route path='/' component={EditCubePage} />
            </Switch>
        </Router>
    )
};

ReactDOM.render( <App />, document.getElementById( 'root' ) );