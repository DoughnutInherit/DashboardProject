import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormBackOffice from '../../components/BackOffice/FormBackOffice';
import SelectedDayEventsList from '../../components/SelectedDayEventsList/SelectedDayEventsList';
import '../../components/SelectedDayEventsList/SelectedDayEventsList.css';
import { postBackOffice, getDailyEvents } from '../../services/serviceWorker';
import {
  setEvents,
  setEventForEdition,
  refreshEventsList,
  resetEditionMode
} from '../../actions/actionAppointment';


class BackOffice extends Component {
  static propTypes = {
    bearerToken: PropTypes.object,
    isEditMode: PropTypes.bool,
    setEvents: PropTypes.func,
    history: PropTypes.object,
    setEventForEdition: PropTypes.func,
    refreshEventsList: PropTypes.func,
    resetEditionMode: PropTypes.func,
    events: PropTypes.array,
  }

  navigate = () => {
    this.props.history.push('Login');
  }

  updateEvents = () => {
    const bearerToken = `Bearer ${this.props.bearerToken}`;
    const now = moment().format('YYYY-MM-DD');
    getDailyEvents(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => { this.props.setEvents(response); })
      .catch(() => {
        alert('Your validation is expired!');
        this.navigate('Login');
      });
  };

  submitEvent = (object) => {
    const entryDate = `${object.date} ${object.iniHour}`;
    const departureDate = `${object.date} ${object.endHour}`;
    const type = '1';

    const eventObject = {
      ...object, entryDate, departureDate, typeid: type,
    };
    const eo = `Bearer ${this.props.bearerToken}`;
    if (this.props.events.filter(x => x.isEditMode).length > 0) {
      postBackOffice('https://localhost:5001/api/event/', eventObject, eo, 'PUT')
        .then(() => { this.updateEvents(); });
    } else {
      postBackOffice('https://localhost:5001/api/event/', eventObject, eo)
        .then(() => { this.updateEvents(); });
    }
  };

  setEventForEdition = (eventId) => {
    const { events } = this.props;
    events.forEach(event => {
      if (event.id === eventId) {
        const eventStartDate = moment(event.entryDate).format('YYYY-MM-DD');
        const eventStartHour = moment(event.entryDate).format('HH:mm');
        const eventEndHour = moment(event.departureDate).format('HH:mm');
        const allday = eventStartHour === '08:00' && eventEndHour === '20:00';
        const newEvent = {
          ...event,
          date: eventStartDate,
          iniHour: eventStartHour,
          endHour: eventEndHour,
          allday,
          isEditMode: true,
        };
        Object.assign(event, newEvent);
        this.props.setEventForEdition(event, true);
      } else {
        Object.assign(event, { isEditMode: false });
      }
    });
    this.props.refreshEventsList(events);
  }

  onEditionCancel = () => {
    this.props.resetEditionMode();
  }

  render() {
    const { events } = this.props;
    return (
      <div className="container-fluid backOffice">
        <Fragment>
          <div className="row">
            <div className="col">
              <FormBackOffice
                onSubmit={this.submitEvent}
                history={this.props.history}
                onCancelClick={this.onEditionCancel}
              />
            </div>
            <div className="col selectedDayEventsBox">
              <h3>Selected Day:</h3>
              <SelectedDayEventsList events={events} eventEditionEvent={this.setEventForEdition} />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bearerToken: state.loginReducer.bearerToken,
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setEvents,
  setEventForEdition,
  refreshEventsList,
  resetEditionMode,
})(BackOffice);
