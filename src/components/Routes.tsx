import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aircrafts from './aircrafts/Aircrafts';
import Airports from './airports/Airports';
import Flight from './flight/Flight';
import AllFlights from './flights/AllFlights';
import Flights from './flights/Flights';
import Home from './home/Home';
import Statistics from './stats/Statistics';

const Routes = (): React.ReactElement => {
    return (
        <Switch>
            <Route
                path={[
                    '/flights/map/all/airport/:airport',
                    '/flights/map/all/:filter',
                    '/flights/map/all',
                    '/flights/map/:year/airport/:airport',
                    '/flights/map/:year/:filter',
                    '/flights/map/:year'
                ]}>
                <AllFlights />
            </Route>
            <Route path={['/flights/airport/:airport', '/flights/:year/airport/:airport', '/flights/:year/:filter', '/flights/:filter', '/flights']}>
                <Flights />
            </Route>
            <Route path="/flight/:filename">
                <Flight />
            </Route>
            <Route path={['/airports/:airport', '/airports']}>
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
