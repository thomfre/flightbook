import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Aircrafts from './aircrafts/Aircrafts';
import Airports from './airports/Airports';
import Flight from './flight/Flight';
import AllFlights from './flights/AllFlights';
import Flights from './flights/Flights';
import Home from './home/Home';
import Statistics from './stats/Statistics';

const Routes = (): React.ReactElement => {
    return (
        <RouterRoutes>
            <Route path="/flights/map/">
                <Route path="all/airport/:airport" element={<AllFlights />} />
                <Route path="all/:filter" element={<AllFlights />} />
                <Route path="all" element={<AllFlights />} />
                <Route path=":year/airport/:airport" element={<AllFlights />} />
                <Route path=":year/:filter" element={<AllFlights />} />
                <Route path=":year" element={<AllFlights />} />
            </Route>
            <Route path="/flights" element={<Flights />}>
                <Route path="airport/:airport" element={<Flights />} />
                <Route path=":year/airport/:airport" element={<Flights />} />
                <Route path=":year/:filter" element={<Flights />} />
                <Route path=":filter" element={<Flights />} />
            </Route>
            <Route path="/flight/:filename" element={<Flight />} />
            <Route path="airports" element={<Airports />}>
                <Route path=":airport" element={<Airports />} />
            </Route>
            <Route path="/aircrafts" element={<Aircrafts />}>
                <Route path=":aircraft" element={<Aircrafts />} />
            </Route>
            <Route path="/statistics" element={<Statistics />}>
                <Route path="flighttime" element={<Statistics />} />
                <Route path="flights" element={<Statistics />} />
            </Route>
            <Route path="/stats" element={<Statistics />} />
            <Route path="/" element={<Home />} />
        </RouterRoutes>
    );
};

export default Routes;
