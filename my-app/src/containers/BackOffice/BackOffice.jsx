/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormBackOffice from '../../components/BackOffice/BackOffice';
import { postBackOffice } from '../../services/serviceWorker';


class BackOffice extends Component {
  static propTypes = {
    bearerToken: PropTypes.object,
    history: PropTypes.object,
  }

  navigate = () => {
    this.props.history.push('DashBoard');
  }

  submitEvent = (object) => {

    const entryDate = object.date + ' ' + object.iniHour;
    const departureDate = object.date + ' ' + object.endHour;
    const type = "1";

    object = { ...object, entryDate, departureDate, typeid: type }
    const eo = "Bearer " + this.props.bearerToken;
    debugger;

    postBackOffice('https://localhost:5001/api/event/', object, eo)
    .then(x=>this.navigate())
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

const mapStateToProps = (state) => ({
  events: state.appointment.events,
  index: state.appointment.eventIndex,
  event: state.appointment.event,
  bearerToken: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
})(BackOffice);
