import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../src/containers/Dashboard/Dashboard';
import BackOffice from '../src/containers/BackOffice/BackOffice';
import Event from '../src/containers/Event/Event';

const getRoutes = () => (
  <Fragment>
    <Route exact path="/Dashboard" component ={Dashboard} />
    <Route exact path="/BackOffice" component ={BackOffice} />
    <Route exact path="/Event" component ={Event} />
  </Fragment>
);

export default getRoutes;
