import { Route, Switch } from 'react-router-dom';

import Flight from './flight/Flight';
import Home from './Home';
import React from 'react';

const Routes = (): React.ReactElement => {
    return (
        <Switch>
            <Route path="/flight/:filename">
                <Flight />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default Routes;
