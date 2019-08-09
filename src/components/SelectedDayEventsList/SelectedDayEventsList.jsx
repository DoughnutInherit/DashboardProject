import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import cookies from 'js-cookie';
import { setEvents } from '../../actions/actionAppointment';
import SelectedDayEvent from '../SelectedDayEvent/SelectedDayEvent';
import '../../containers/Dashboard/Dashboard.css';
import './SelectedDayEventsList.css';
import { getApiData } from '../../services/serviceWorker';

class SelectedDayEventsList extends Component {
  static propTypes = {
    events: PropTypes.array,
    setEvents: PropTypes.func,
    token: PropTypes.string,
    eventEditionEvent: PropTypes.func,
    onDelete: PropTypes.func,
    history: PropTypes.object,
  }

  componentDidMount = () => {
    const token = cookies.get('token');
    getApiData(`https://localhost:5001/api/event/${moment().format('YYYY-MM-DD')}`, `Bearer ${token}`)
      .then(x => { this.props.setEvents(x); })
      .catch(() => {
        alert("You have to sing in to edit events");
        this.props.history.push('Login');
    })

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
                key={event.id}
                onDeleteEvent={this.props.onDelete}
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
