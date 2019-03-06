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

  navigate = () => {
    this.props.history.push('Dashboard');
  }

  componentDidMount = () => {
    const now = moment();
    const eventTimeEnd = moment(this.props.events[this.props.index].dateEnd);
    const timeRemeaning = eventTimeEnd.diff(now);
    this.timer = setTimeout(() => {
      this.navigate();
    }, timeRemeaning);
  }

  componentWillUnmount = () => {
    debugger;
    if (this.props.index < this.props.events.length - 1) {
      this.props.setIndex(this.props.index + 1);
    }
    clearTimeout(this.timer);
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
  index: state.appointment.eventIndex,
});

export default connect(mapStateToProps, {
  setEvents, setIndex,
})(EventUp);
