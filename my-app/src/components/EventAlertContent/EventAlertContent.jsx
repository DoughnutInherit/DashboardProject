import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { setTime } from '../../actions/actionAppointment';

class EventAlertContent extends Component {
  static propTypes = {
    history: PropTypes.object,
    currentTime: PropTypes.string,
    setTime: PropTypes.func,
    events: PropTypes.array,
  };

  changePageAlert = (eventEnd, url) => {
    const now = moment();
    const diffInSeconds = now.diff(eventEnd, 'seconds');
    debugger;
    if (diffInSeconds === 0) {
      this.props.history.push(url);
    }
  };

  componentDidMount = () => {
    setInterval(() => {
      this.props.setTime(new Date().toString());
      this.changePageAlert(this.props.events[0].dateEnd, 'Dashboard');
    }, 1000);
  };

  render() {
    return (
      <div align="center">
        <h3>{this.props.events[0].title}</h3>
        <h5>{this.props.events[0].description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTime: state.appointment.time,
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setTime,
})(EventAlertContent);
