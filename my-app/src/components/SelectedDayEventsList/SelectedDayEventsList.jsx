import React, { Component } from 'react';
import SelectedDayEvent from '../SelectedDayEvent/SelectedDayEvent';
import './SelectedDayEventsList.css';

class SelectedDayEventsList extends Component {
  render() {
    return (
      <table>
        <tr>
          <SelectedDayEvent />
        </tr>
      </table>
    );
  }
}

export default SelectedDayEventsList;
