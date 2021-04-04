import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import React from 'react';

const Routes = (): React.ReactElement => {
    return (
        <Switch>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default Routes;
