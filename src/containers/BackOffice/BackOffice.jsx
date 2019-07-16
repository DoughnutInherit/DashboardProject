import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormBackOffice from '../../components/BackOffice/FormBackOffice';
import SelectedDayEventsList from '../../components/SelectedDayEventsList/SelectedDayEventsList';
import '../../components/SelectedDayEventsList/SelectedDayEventsList.css';
import { postBackOffice, getApiData } from '../../services/serviceWorker';
import {
  setEvents,
  setEventForEdition,
  refreshEventsList,
  resetEditionMode,
} from '../../actions/actionAppointment';
import cookies from 'js-cookie';
import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder } from '@aspnet/signalr';


class BackOffice extends Component {
  static propTypes = {
    isEditMode: PropTypes.bool,
    setEvents: PropTypes.func,
    history: PropTypes.object,
    setEventForEdition: PropTypes.func,
    refreshEventsList: PropTypes.func,
    resetEditionMode: PropTypes.func,
    events: PropTypes.array,
    bearerToken: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      hubConnection: {}
    };
  }

  navigate = () => {
    this.props.history.push('Login');
  }

  componentDidMount() {
    try {
      const hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/eventos")
        .configureLogging(signalR.LogLevel.Information)
        .build();

      hubConnection.start();
      this.setState({ hubConnection });
    } catch (error) {
      console.log(error)
    }
  }

  updateDashboardEvents = () => {
    this.state.hubConnection
      .invoke('UpdateEvents')
      .catch(err => console.error(err));
  };


  updateEvents = () => {
    const cacheToken = cookies.get('token')
    const bearerToken = `Bearer ${cacheToken}`;
    const now = moment().format('YYYY-MM-DD');
    getApiData(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => { this.props.setEvents(response); })
      .catch(() => {

      });
  };

  submitEvent = (object) => {
    const entryDate = `${object.date} ${object.iniHour}`;
    const departureDate = `${object.date} ${object.endHour}`;
    const type = '1';

    const eventObject = {
      ...object, entryDate, departureDate, typeid: type,
    };
    const eo = `Bearer ${cookies.get('token')}`;
    if (this.props.events.filter(x => x.isEditMode).length > 0) {
      postBackOffice('https://localhost:5001/api/event/', eventObject, eo, 'PUT')
        .then(() => { this.updateEvents(); });
    } else {
      postBackOffice('https://localhost:5001/api/event/', eventObject, eo)
        .then(() => { this.updateEvents(); });
    }
    this.updateDashboardEvents();
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
              <SelectedDayEventsList
                events={events}
                eventEditionEvent={this.setEventForEdition}
                hubConnection={this.state.hubConnection}
                onDelete={this.updateDashboardEvents}
              />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.appointment.events,
  bearerToken: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
  setEvents,
  setEventForEdition,
  refreshEventsList,
  resetEditionMode,
})(BackOffice);
