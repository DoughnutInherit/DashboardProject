import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents } from '../../actions/actionAppointment';
import SelectedDayEvent from '../SelectedDayEvent/SelectedDayEvent';
import '../../containers/Dashboard/Dashboard.css';
import './SelectedDayEventsList.css';
import { getDailyEvents } from '../../services/serviceWorker';

class SelectedDayEventsList extends Component {
  static propTypes = {
    events: PropTypes.array,
    setEvents: PropTypes.func,
    token: PropTypes.string,
    eventEditionEvent: PropTypes.func,
  }


  componentDidMount = () => {
    getDailyEvents(`https://localhost:5001/api/event/${moment().format('YYYY-MM-DD')}`, `Bearer ${this.props.token}`)
      .then(x => { this.props.setEvents(x); });
  };

  render() {
    return (
      <table className="table">
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
              <SelectedDayEvent
                onClickEditButton={this.props.eventEditionEvent}
                isEditMode={event.isEditMode}
                event={event}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
  setEvents,
})(SelectedDayEventsList);
