/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectedDayEvent.css';
import '../SelectedDayEventsList/SelectedDayEventsList.css';
import deleteIcon from '../../services/trash.png';
import editIcon from '../../services/edit.png';


class SelectedDayEvent extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  render() {
    return (
      <tr className="eventRow">
        <td className="hourCol">00:00</td>
        <td className="hourCol">00:00</td>
        <td className="titleCol">{this.props.event.title}</td>
        <td className="buttonCol">
          <img src={editIcon} alt="EditButton" className="imageButton" />
        </td>
        <td className="buttonCol">
          <img src={deleteIcon} alt="DeleteButton" className="imageButton" />
        </td>
      </tr>
    );
  }
}

export default SelectedDayEvent;
