import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import cookies from 'js-cookie';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
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
import SelectedDayPicker from '../../components/SelectedDay/SelectedDay';
import './BackOffice.css';
import 'react-datepicker/dist/react-datepicker.css';


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
      hubConnection: {},
      startDate: new Date(),
    };
  }

  componentDidMount() {
    try {
      const hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/eventos')
        .configureLogging(LogLevel.Information)
        .build();

      hubConnection.start();
      this.setState({ hubConnection });
    } catch (error) {
      console.log(error);
    }
  }

  navigate = () => {
    this.props.history.push('Login');
  }

  updateDashboardEvents = () => {
    this.state.hubConnection
      .invoke('UpdateEvents')
      .catch(err => console.error(err));
  };


  updateEvents = (date = moment().format('YYYY-MM-DD')) => {
    const cacheToken = cookies.get('token');
    const bearerToken = `Bearer ${cacheToken}`;
    getApiData(`https://localhost:5001/api/event/${date}`, bearerToken)
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

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    this.updateEvents(moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'));
  }

  changeListDay = (dayDiff) => {
    const newDate = moment(this.state.startDate).add(dayDiff, 'days').format('DD/MM/YYYY');
    const date = moment(newDate, 'DD/MM/YYYY').toDate();
    this.handleChange(date);
  }

  render() {
    const { events } = this.props;
    return (
      <div className="container-fluid backOffice">
        <Fragment>
          <div className="row">
            <div className="col selectedDayEventsBox">
              <h3>
                {'Selected Day:'}
                <SelectedDayPicker
                  className="dayPicker"
                  startDate={this.state.startDate}
                  handleChange={this.handleChange}
                  goBack={() => this.changeListDay(-1)}
                  goFront={() => this.changeListDay(1)}
                />
              </h3>
              <SelectedDayEventsList
                events={events}
                eventEditionEvent={this.setEventForEdition}
                hubConnection={this.state.hubConnection}
                onDelete={this.updateDashboardEvents}
              />
            </div>
            <div className="col container">
              <FormBackOffice
                onSubmit={this.submitEvent}
                history={this.props.history}
                onCancelClick={this.onEditionCancel}
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
