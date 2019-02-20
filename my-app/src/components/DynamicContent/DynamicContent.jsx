import React, { Component } from 'react';
import './DynamicContent.css';
import colors from '../../constants/colors.mp4';

class DynamicContent extends Component {
  render() {
    return (
      <div align="center">
        <video width="750" height="240" autoPlay="true" loop muted="true">
          <source src={colors} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default DynamicContent;
