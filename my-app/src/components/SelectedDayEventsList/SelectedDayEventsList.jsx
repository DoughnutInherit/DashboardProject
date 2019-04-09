import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvents } from '../../actions/actionAppointment';
import SelectedDayEvent from '../SelectedDayEvent/SelectedDayEvent';
import '../../containers/Dashboard/Dashboard.css';
import dailyInfo from '../../services/dailyInfo.json';

class SelectedDayEventsList extends Component {
  static propTypes = {
    events: PropTypes.array,
    setEvents: PropTypes.func,
  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);
  };


  render() {
    debugger;
    return (
      <table className="table table-striped shadow">
        {
          this.props.events.map(event => (
            <SelectedDayEvent event={event} />
          ))
        }
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
