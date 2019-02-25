/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import Appointment from '../../components/Appointment/Appointment';
import DynamicContent from '../../components/DynamicContent/DynamicContent';
import Birthday from '../../components/Birthday/Birthday';
import Weather from '../../components/Weather/Weather';


import './Dashboard.css';

class Dashboard extends Component {

  render() {
    return (
      <div class="containerDashBoard" >
        <Fragment>
          <div class="row">
            <div class="col">
              <Appointment />
            </div>
            <div class="col">
              <Weather />
            </div>
            <div class="w-100" />
            <div class="col">
              <Birthday />
            </div>
            <div class="col">
              <DynamicContent />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Dashboard;
