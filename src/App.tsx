import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';

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
