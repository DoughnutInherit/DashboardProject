import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvent, setTime } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

class Appointment extends Component {
  static propTypes = {
    event: PropTypes.object,
    setEvent: PropTypes.func,
    currentTime: PropTypes.string,
    setTime: PropTypes.func,
  }

  // changePageAlert = (currentTime) => {
  //   if (currentTime) {
  //   }
  // };

  componentDidMount = () => {
    debugger;
    const numberEvents = dailyInfo.events.length;
    fetch('https://localhost:44377/api/event')
      .then(data => console.log(data));

    let index = 0;
    if (index < numberEvents) {
      this.props.setEvent(dailyInfo.events[index]);
      setInterval(() => {
        this.props.setTime(new Date().toLocaleString());
        //this.changePageAlert(this.props.currentTime);
      }, 1000);
      index += 1;
    }
  };

  render() {
    let date;
    if (this.props.event.dateIni !== undefined) {
      date = this.props.event.dateIni.substring(0, 10) + this.props.event.dateIni.substring(11, 20);
    }
    //20/2/2019 12:31:13


    return (
      <div>
        <div>
          <h4>{this.props.event.title}</h4>
        </div>
        <div>
          <p>{this.props.event.description}</p>
          <p>{date}</p>
          <p>{this.props.currentTime}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.appointment.event,
  currentTime: state.appointment.time,
});

export default connect(mapStateToProps, {
  setEvent, setTime,
})(Appointment);
