import React, { Component } from 'react';
import { video } from '../../constants/constants';
import '../../containers/Dashboard/Dashboard.css';
import './Video.css';

class Video extends Component {
  render() {
    return (
      <div align="center">
        <video autoPlay loop muted className="videoStyle shadow">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;
