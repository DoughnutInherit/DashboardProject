/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectedDayEvent.css';
import '../SelectedDayEventsList/SelectedDayEventsList.css';


class SelectedDayEvent extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  render() {
    return (
      <tr className="eventRow">
        <div className="selectedEventDate">
          <h4 className="selectedEventDateText">00:00 - 00:00</h4>
        </div>
        <div className="selectedEventData">
          <div className="selectedEventTitle">
            <h5 className="eventTitleText">{this.props.event.title}</h5>
          </div>
          <div className="selectedEventDescription">
            <h6 className="eventDescriptionText">{this.props.event.description}</h6>
          </div>
        </div>
      </tr>
    );
  }
}

export default SelectedDayEvent;
