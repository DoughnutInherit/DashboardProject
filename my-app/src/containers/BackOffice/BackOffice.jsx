/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import FormBackOffice from '../../components/BackOffice/BackOffice';
import { postBackOffice } from '../../services/serviceWorker';


class BackOffice extends Component {

  submitEvent = (object) => {

    const entryDate = object.date + ' ' + object.iniHour;
    const departureDate = object.date + ' ' + object.iniHour;
    const type = "1";

    object = { ...object, entryDate, departureDate, typeid: type }
    debugger;

    postBackOffice('https://localhost:5001/api/event/', object, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheWxsb25AZ21haWwuY29tIiwianRpIjoiZmRhMDMzNzAtNzUxNi00NjMxLWJmNjktZWY2MDg4YTQwMTQxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJhODU1NjFkOC0wMTkxLTQ1NzAtYmViZi0wMGVmMDBkNGEyZWIiLCJleHAiOjE1NTM1MTQ1ODIsImlzcyI6Imh0dHA6Ly95b3VyZG9tYWluLmNvbSIsImF1ZCI6Imh0dHA6Ly95b3VyZG9tYWluLmNvbSJ9.Q8bg5XrJWM3S5Z0wDhKrtdurm7xxOAHcOCcUBa3fMMo')
  };

  render() {
    return (
      <div class="container" >
        <Fragment>
          <FormBackOffice onSubmit={this.submitEvent} />
        </Fragment>
      </div>
    );
  }
}

export default BackOffice;
