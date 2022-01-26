import './App.css';

import Layout from './components/Layout';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import screenfull from 'screenfull';

// https://github.com/brunob/leaflet.fullscreen/issues/81#issuecomment-793197922
window.screenfull = screenfull;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    console.log = function () {};
}

const configureDayJs = (): void => {
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    dayjs.extend(advancedFormat);
};

const App = (): React.ReactElement => {
    configureDayJs();

    return (
        <Router>
            <Layout />
        </Router>
    );
};

export default App;
