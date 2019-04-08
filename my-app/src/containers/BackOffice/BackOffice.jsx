/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormBackOffice from '../../components/BackOffice/BackOffice';
import SelectedDayEventsList from '../../components/SelectedDayEventsList/SelectedDayEventsList';
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

    postBackOffice('https://localhost:5001/api/event/', object, eo)
      .then(x => this.navigate())
  };

  render() {
    return (
      <div className="container-fluid backOffcie">
        <Fragment>
          <div className="row">
            <div className="col">
              <FormBackOffice onSubmit={this.submitEvent} />
            </div>
            <div className="col">
              <h3>Selected Day:</h3>
              <SelectedDayEventsList />
            </div>
          </div>
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
