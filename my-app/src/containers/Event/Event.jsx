/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dailyInfo from '../../services/dailyInfo.json';
import { connect } from 'react-redux';
import { setEvent } from '../../actions/actionAppointment';

class Event extends Component {

    static propTypes = {
        event: PropTypes.object,
        setEvent: PropTypes.func,
    }

    componentDidMount = () => {
        this.props.setEvent(dailyInfo.events[1])
    }

  render() {
    return (
      <div class="container" >
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
  });

export default connect(mapStateToProps, {
    setEvent,
})(Event);
