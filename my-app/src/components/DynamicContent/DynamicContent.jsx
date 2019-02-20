import React, { Component } from 'react';
import './DynamicContent.css';
import Video from '../Video/Video';
//import colors from '../../constants/colors.mp4';

class DynamicContent extends Component {
  render() {
    return (
      <div align="center">
        <Video />
      </div>
    );
  }
}

export default DynamicContent;
