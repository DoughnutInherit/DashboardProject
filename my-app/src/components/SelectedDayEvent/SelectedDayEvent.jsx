/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import './SelectedDayEvent.css';
import '../SelectedDayEventsList/SelectedDayEventsList.css';
import deleteIcon from '../../services/trash.png';
import editIcon from '../../services/edit.png';
import { setEventForEdition, removeEvent } from '../../actions/actionAppointment';
import { deleteEvent } from '../../services/serviceWorker';


class SelectedDayEvent extends Component {
  static propTypes = {
    event: PropTypes.object,
    setEventForEdition: PropTypes.func,
    token: PropTypes.string,
    removeEvent: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCSSClass: '',
    };
  }

  setForEdition = () => {
    let { event } = this.props;
    const eventStartDate = moment(event.entryDate).format('YYYY-MM-DD');
    const eventStartHour = moment(event.entryDate).format('HH:mm');
    const eventEndHour = moment(event.departureDate).format('HH:mm');
    const allday = eventStartHour === '08:00' && eventEndHour === '20:00';
    event = {
      ...event, date: eventStartDate, iniHour: eventStartHour, endHour: eventEndHour, allday,
    };
    this.setState({ selectedCSSClass: 'selectedRow' });
    this.props.setEventForEdition(event, true);
  }

  deleteEvent = () => {
    deleteEvent(`https://localhost:5001/api/event/${this.props.event.id}`, `Bearer ${this.props.token}`);
    this.props.removeEvent(this.props.event);
    this.props.setEventForEdition({}, false);
  };

  render() {
    const { event } = this.props;
    debugger;
    return (
      <tr className={`eventRow ${this.state.selectedCSSClass}`}>
        <td className="hourCol">{moment(event.entryDate).format('HH:mm')}</td>
        <td className="hourCol">{moment(event.departureDate).format('HH:mm')}</td>
        <td className="titleCol">{event.title}</td>
        <td className="buttonCol">
          <button
            type="button"
            className="selectedEventEditButton"
            onClick={this.setForEdition}
          >
            <img src={editIcon} alt="EditButton" className="imageButton" />
          </button>
        </td>
        <td className="buttonCol">
          <button
            type="button"
            className="selectedEventEditButton"
            onClick={this.deleteEvent}
          >
            <img src={deleteIcon} alt="DeleteButton" className="imageButton" />
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  token: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, { setEventForEdition, removeEvent })(SelectedDayEvent);
