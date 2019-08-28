import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Appointment.css';

class Appointment extends Component {
  static propTypes = {
    event: PropTypes.object,
  }

  render() {
    const { event } = this.props;
    let phrase = "Hoy nos visita ";

    if(event.title !== undefined){
      if (event.clientCompanyName !== "") {
        if (event.clientPosition !== "") {
          phrase = `${phrase} ${event.clientName}, ${event.clientPosition} de ${event.clientCompanyName}`
        } else {
          if (event.clientName !== "") {
            phrase = `${phrase} ${event.clientName}, de ${event.clientCompanyName}`
          } else {
            phrase = `${phrase}n nuestros amigos de ${event.clientCompanyName}`
          }
        }
      } else {
        phrase =  `${phrase} ${event.clientName}`;
      }
    }
    else{
      phrase = event.description;
    }

    return (
      <div className="row eventContainer">
        <div className="col">
          <h2 className="eventTitle">Próximas visitas:</h2>
        </div>
        <div className="w-100" />
        <div className="col">
          {event === undefined
            ? <p className="eventDescription">Sin eventos</p>
            : <p className="eventDescription">
              {phrase}
            </p>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.appointment.event,
});

export default connect(mapStateToProps, {
})(Appointment);
