import React, { Component, Fragment } from 'react';
import { Router, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import getRoutes from '../../Routes';

import DevTools from '../DevTools/devTools';
import 'react-toastify/dist/ReactToastify.css';

class Root extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.routes = getRoutes();
  }

  render() {
    return (
      <Fragment>
        <DevTools />
        <ToastContainer />
        <Router history={this.props.history}>
          <Switch>
            {this.routes}
          </Switch>
        </Router>
        <DevTools />
      </Fragment>
    );
  }
}

export default Root;
