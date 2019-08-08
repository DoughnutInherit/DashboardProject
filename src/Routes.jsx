import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import BackOffice from './containers/BackOffice/BackOffice';
import Event from './containers/Event/Event';
import Login from './containers/Login/Login';

const getRoutes = () => (
  <Fragment>
    <Route exact path="/" component={Login} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/BackOffice" component={BackOffice} />
    <Route exact path="/Event" component={Event} />
    <Route exact path="/Login" component={Login} />
  </Fragment>
);

export default getRoutes;
