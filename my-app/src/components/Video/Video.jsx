import React, { Component } from 'react';
import { video } from '../../constants/constants';

class Video extends Component {
  render() {

    return (
      <div align="center">
        <video width="750" height="240" autoPlay={true} loop muted={true}>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;