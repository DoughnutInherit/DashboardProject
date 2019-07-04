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
    onClickEditButton: PropTypes.func,
    isEditMode: PropTypes.bool,
  };

  deleteEvent = () => {
    deleteEvent(`https://localhost:5001/api/event/${this.props.event.id}`, `Bearer ${this.props.token}`);
    this.props.removeEvent(this.props.event);
  };

  render() {
    const { event, isEditMode } = this.props;
    return (
      <tr className={`eventRow ${isEditMode ? 'selectedRow' : ''}`}>
        <td className="hourCol">{moment(event.entryDate).format('HH:mm')}</td>
        <td className="hourCol">{moment(event.departureDate).format('HH:mm')}</td>
        <td className="titleCol">{event.title}</td>
        <td className="buttonCol">
          <button
            type="button"
            className="selectedEventEditButton"
            onClick={() => this.props.onClickEditButton(event.id)}
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
