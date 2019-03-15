/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventUp from '../../components/EventUp/EventUp';
import './Event.css';

class Event extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <div className="background">
        <div className="container-fluid containerAlert opac">
          <EventUp history={this.props.history} />
        </div>
      </div>

    );
  }
}

export default Event;
