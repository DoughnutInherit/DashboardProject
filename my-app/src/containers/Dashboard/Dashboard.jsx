/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Appointment from '../../components/Appointment/Appointment';
import DynamicContent from '../../components/DynamicContent/DynamicContent';
import Birthday from '../../components/Birthday/Birthday';
import Weather from '../../components/Weather/Weather';


import './Dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <div className="container-fluid dashboard">
        <Fragment>
          <div className="row topRow">
            <div className="col-lg-7 appointmentContainer shadow">
              <Appointment history={this.props.history} />
            </div>
            <div className="col-lg-4 offset-md-1 weatherContainer shadow">
              <Weather />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <Birthday />
            </div>
            <div className="col-lg-7 offset-md-1">
              <DynamicContent />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Dashboard;
