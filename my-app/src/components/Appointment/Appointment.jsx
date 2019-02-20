import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvent } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

class Appointment extends Component {
  static propTypes = {
    event: PropTypes.object,
    setEvent: PropTypes.func,
  }

  componentDidMount = () => {
    this.props.setEvent(dailyInfo.events[0]);
  };

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
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.appointment.event,
});

export default connect(mapStateToProps, {
  setEvent,
})(Appointment);
