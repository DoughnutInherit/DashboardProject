/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './EventUp.css';

class EventUp extends Component {
  static propTypes = {
    event: PropTypes.object,
  }

  render() {
    const { event } = this.props;

    return (
      <div className="row alertContainer">
        <div className="col titleStyle">
          <h1>
            {event.title}
          </h1>
        </div>
        <div className="w-100" />
        <div className="col descriptionStyle">
          <p>{event.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.appointment.event,
});

export default connect(mapStateToProps, {
})(EventUp);
