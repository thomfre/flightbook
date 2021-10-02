import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aircrafts from './aircrafts/Aircrafts';
import Airports from './airports/Airports';
import Flight from './flight/Flight';
import Flights from './flights/Flights';
import Home from './home/Home';
import Statistics from './stats/Statistics';

const Routes = (): React.ReactElement => {
    return (
        <Switch>
            <Route path={['/flights/:year/:filter', '/flights/:filter', '/flights']}>
                <Flights />
            </Route>
            <Route path="/flight/:filename">
                <Flight />
            </Route>
            <Route path="/airports">
                <Airports />
            </Route>
            <Route path={['/aircrafts/:aircraft', '/aircrafts']}>
                <Aircrafts />
            </Route>
            <Route path={['/statistics/flighttime', '/stats', '/statistics']}>
                <Statistics />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default Routes;
