import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import video from '../../constants/video.mp4';


class Video extends Component {
  render() {
    return (
      <Player autoPlay src={video} muted loop>
        <ControlBar disableCompletely/>
      </Player>
    );
  }
}

export default Video;
