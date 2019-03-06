/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import FormBackOffice from '../../components/BackOffice/BackOffice';

class BackOffice extends Component {

  render() {
    return (
      <div class="container" >
        <Fragment>
          <FormBackOffice/>
        </Fragment>
      </div>
    );
  }
}

export default BackOffice;
