/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import EventAlertContent from '../../components/EventAlertContent/EventAlertContent';

import './EventAlert.css';

class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <div class="container">
        <Fragment>
          <EventAlertContent history={this.props.history} />
        </Fragment>
      </div>
    );
  }
}

export default Dashboard;
