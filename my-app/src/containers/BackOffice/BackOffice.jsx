/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import FormBackOffice from '../../components/BackOffice/BackOffice';
import { postBackOffice } from '../../services/serviceWorker'


class BackOffice extends Component {

  submitEvent = (object) => { postBackOffice('https://localhost:5001/api/event', object, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwaW1wYW1wdW1hYUBnbWFpbC5jb20iLCJqdGkiOiIyYjc0ZTJkYS0xNTg2LTRjNTItYjY3OC02OTc3Y2QxMjZmYjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZmYjhmN2U2LTVmMzQtNDExZC05YTQ1LTkzZDMyNzdhYTk5MiIsImV4cCI6MTU1MzUwNTQ3NiwiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.88zFJvvKOFQc8k4kW1ghWblBM38THoS0cA7wvGiyvtU') };

  render() {
    return (
      <div class="container">
        <Fragment>
          <FormBackOffice onSubmit={this.submitEvent} />
        </Fragment>
      </div>
    );
  }
}

export default BackOffice;
