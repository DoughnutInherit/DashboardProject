/* eslint-disable import/no-useless-path-segments */
/* eslint-disable quotes */
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "./containers/Dashboard/Dashboard";
import EventAlert from '../src/containers/EventAlert/EventAlert';

const getRoutes = () => (
  <Fragment>
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/Event" component={EventAlert} />
  </Fragment>
);

export default getRoutes;
