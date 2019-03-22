/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import FormBackOffice from '../../components/BackOffice/BackOffice';

class BackOffice extends Component {

  submitEvent = (object) => {debugger;/*post here*/};

  render() {
    return (
      <div class="container" >
        <Fragment>
          <FormBackOffice onSubmit={ this.submitEvent }/>
        </Fragment>
      </div>
    );
  }
}

export default BackOffice;
