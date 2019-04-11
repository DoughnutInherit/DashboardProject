import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvents } from '../../actions/actionAppointment';
import SelectedDayEvent from '../SelectedDayEvent/SelectedDayEvent';
import '../../containers/Dashboard/Dashboard.css';
import dailyInfo from '../../services/dailyInfo.json';
import './SelectedDayEventsList.css';

class SelectedDayEventsList extends Component {
  static propTypes = {
    events: PropTypes.array,
    setEvents: PropTypes.func,
  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);
  };


  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr className="tableHead">
            <th>Begins at:</th>
            <th>Ends at:</th>
            <th>Event Title:</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.events.map(event => (
              <SelectedDayEvent event={event} />
            ))
          }
        </tbody>
      </table>
    );
  }
}


const mapStateToProps = (state) => ({
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setEvents,
})(SelectedDayEventsList);
