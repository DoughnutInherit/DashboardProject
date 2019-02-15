import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvent } from '../../actions/actionAppointment';
import './Appointment.css';

class Appointment extends Component {
  static propTypes = {
    event: PropTypes.object,
    setEvent: PropTypes.func,
  }

  componentDidMount = () => {
    this.props.setEvent('hola');
    const url= './services/dailyInfo.json';
    fetch(url)
      .then(response => response.json())
      .then(json => console.log(json));
  // Aui d problemas, consigue pillar la ino del json i guardarlo en el evento haciendo:
  // this.props.setEvent(la info de el json)
  // Luego despliegas los datos que encesites en elr ender (this.props.event.title)
  };

  render() {
    debugger;
    //
    return (
      <div>
        <div>
          <h4> Próximas visitas </h4>
        </div>
        <div>
          <p>El jueves 29 nos visitara Alguien</p>
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
