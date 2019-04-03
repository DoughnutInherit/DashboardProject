/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import FormBackOffice from '../../components/BackOffice/BackOffice';
import { postBackOffice } from '../../services/serviceWorker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class BackOffice extends Component {

  static propTypes = {
    bearerToken: PropTypes.object,
  }

  submitEvent = (object) => { 
    const entryDate = object.date + ' ' + object.iniHour;
    const departureDate = object.date + ' ' + object.iniHour;
    const type = "1";

    object = { ...object, entryDate, departureDate, typeid: type }

    postBackOffice('https://localhost:5001/api/event', object, this.props.bearerToken )
  };

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

const mapStateToProps = (state) => ({
  bearerToken: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
})(BackOffice);
