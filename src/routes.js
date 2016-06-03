import React from 'react';
import { Redirect, Route, Router } from 'react-router';

import Home from 'components/Home';

export const makeRoutes = () => (
  <Router>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Router>
);

export default makeRoutes;
