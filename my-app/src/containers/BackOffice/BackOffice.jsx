import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormBackOffice from '../../components/BackOffice/FormBackOffice';
import SelectedDayEventsList from '../../components/SelectedDayEventsList/SelectedDayEventsList';
import { postBackOffice } from '../../services/serviceWorker';
import '../../components/SelectedDayEventsList/SelectedDayEventsList.css';
import { getApiData } from '../../services/serviceWorker';
import moment from 'moment';
import { setEvents } from '../../actions/actionAppointment';


class BackOffice extends Component {
  static propTypes = {
    bearerToken: PropTypes.object,
    isEditMode: PropTypes.bool,
    setEvents: PropTypes.func,
  }

  navigate = () => {
    this.props.history.push('Login');
  }

  updateEvents = () => {
    const bearerToken = `Bearer ${this.props.bearerToken}`;

    const now = moment().format('YYYY-MM-DD');
    getApiData(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => { this.props.setEvents(response); })
      .catch((err) => {
        alert('Your validation is expired!');
        this.navigate('Login');
      });
  };

  submitEvent = (object) => {
    const entryDate = `${object.date} ${object.iniHour}`;
    const departureDate = `${object.date} ${object.endHour}`;
    const type = '1';

    object = {
      ...object, entryDate, departureDate, typeid: type,
    };
    const eo = `Bearer ${this.props.bearerToken}`;
    if (this.props.isEditMode) {
      postBackOffice('https://localhost:5001/api/event/', object, eo, 'PUT')
        .then(x => { this.updateEvents(); })
    } else {
      postBackOffice('https://localhost:5001/api/event/', object, eo)
        .then(x => { this.updateEvents(); })
    }
  };


  render() {
    return (
      <div className="container-fluid backOffice">
        <Fragment>
          <div className="row">
            <div className="col">
              <FormBackOffice onSubmit={this.submitEvent} history={this.props.history} />
            </div>
            <div className="col selectedDayEventsBox">
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
  isEditMode: state.appointment.isEditionMode,
});

export default connect(mapStateToProps, {
  setEvents
})(BackOffice);
