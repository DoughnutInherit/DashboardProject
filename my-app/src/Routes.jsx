import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../src/containers/Dashboard/Dashboard";

const getRoutes = () => (
  <Fragment>
    <Route exact path="/Dashboard" component={Dashboard} />
  </Fragment>
);

export default getRoutes;
