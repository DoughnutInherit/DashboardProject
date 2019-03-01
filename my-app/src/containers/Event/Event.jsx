/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  EventUp  from '../../components/EventUp/EventUp';

class Event extends Component {
  
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <div class="container" >
        <div>
          <EventUp history={this.props.history}/>
        </div>
      </div>
    );}
  }

export default Event;
