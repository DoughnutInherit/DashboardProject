/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvent, setTime, setEvents } from '../../actions/actionAppointment';
import dailyInfo from '../../services/dailyInfo.json';


class EventUp extends Component {

    static propTypes = {
        event: PropTypes.object,
        setEvent: PropTypes.func,
        history: PropTypes.object,
        currentTime: PropTypes.string,
        setTime: PropTypes.func,
        events: PropTypes.array,
        setEvents: PropTypes.func,
    }

    changePage = (eventEnd) => {
        const now = moment();
        const diffInSeconds = now.diff(eventEnd, 'seconds');
    
        if (diffInSeconds > 0 && diffInSeconds < 60) {
          this.props.history.push('Dashboard');
        }
      };

    componentDidMount = () => {
        this.props.setEvent(dailyInfo.events[0])

        setInterval(() => {
            this.props.setTime(new Date().toString());
            this.changePage(this.props.events[0].dateEnd);
          }, 60000);
    }

  render() {
    return (
      <div>
        <div>
           <h4>{this.props.event.title}</h4>
        </div>
        <div>
           <p>{this.props.event.description}</p>
        </div>
      </div>
    );}
  }

const mapStateToProps = (state) => ({
    event: state.appointment.event,
    currentTime: state.appointment.time,
    events: state.appointment.events,
  });

export default connect(mapStateToProps, {
    setEvent, setTime, setEvents,
})(EventUp);
