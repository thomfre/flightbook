import { Route, Switch } from 'react-router-dom';

import Flight from './flight/Flight';
import Flights from './flights/Flights';
import Home from './stats/Home';
import React from 'react';

const Routes = (): React.ReactElement => {
    return (
        <Switch>
            <Route path="/flights">
                <Flights />
            </Route>
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
