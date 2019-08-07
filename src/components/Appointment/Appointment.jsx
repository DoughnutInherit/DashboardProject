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
    let phrase = "";

    if (event.clientCompanyName !== "") {
      if (event.clientPosition !== "") {
        phrase = `${event.clientName}, ${event.clientPosition} de ${event.clientCompanyName}`
      } else {
        phrase = `${event.clientName}, de ${event.clientCompanyName}`     
      }  
    } else {
      phrase = event.clientName    
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
              Hoy nos visita {phrase}
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
