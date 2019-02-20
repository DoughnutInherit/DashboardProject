import React, { Component } from 'react';
//import colors from '../../constants/colors.mp4';

class Video extends Component {
  render() {

    return (
      <div align="center">
        <video width="750" height="240" autoPlay={true} loop muted={true}>
          <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;