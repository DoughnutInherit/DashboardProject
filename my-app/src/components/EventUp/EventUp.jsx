/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents, setIndex } from '../../actions/actionAppointment';

class EventUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    index: PropTypes.number,
    setIndex: PropTypes.func,
  }

  componentDidMount = () => {
    const now = moment();
    const eventTimeEnd = moment(this.props.events[this.props.index].dateEnd);
    const timeRemeaning = eventTimeEnd.diff(now);
    debugger;
    setTimeout(() => {
      this.props.history.push('Event');
    }, timeRemeaning, 'milliseconds');
  }

  componentWillUnmount = () => {
    this.props.setIndex(this.props.index + 1);
  }

  render() {
    return (
      <div>
        <div>
          <h4>{this.props.events[this.props.index].title}</h4>
        </div>
        <div>
          <p>{this.props.events[this.props.index].description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.appointment.events,
  index: state.appointment.index,
});

export default connect(mapStateToProps, {
  setEvents, setIndex,
})(EventUp);
