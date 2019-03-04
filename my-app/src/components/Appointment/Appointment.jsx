import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents, setIndex } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

class Appointment extends Component {
  static propTypes = {
    history: PropTypes.object,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    setIndex: PropTypes.func,
    index: PropTypes.number,
  }

  navigate = () => {
    debugger;
    this.props.history.push('Event');
  }

  componentDidUpdate = () => {
    const now = moment();
    const eventTimeIni = moment(this.props.events[this.props.index].dateIni);
    const timeRemeaning = eventTimeIni.diff(now);
    debugger;
    setTimeout(() => {
      this.navigate();
    }, timeRemeaning);
    //ERROR AQUI!

  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);
  };

  componentWillUnmount = () => {
    clearInterval(this.id);
  }

  render() {
    const { index } = this.props;
    return (
      <div>
        <div>
          <h4>{this.props.events[index].title}</h4>
        </div>
        <div>
          <p>{this.props.events[index].description}</p>
          {this.props.events[index].dateIni !== undefined
            ? <p>{this.props.events[index].dateIni.toLocaleString()}</p>
            : <p />
          }
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
})(Appointment);
