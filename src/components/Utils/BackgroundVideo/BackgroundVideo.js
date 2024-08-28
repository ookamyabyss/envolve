import React from 'react';
import './BackgroundVideo.css';
import index from  '../../../assets/videos/index.mp4'

const BackgroundVideo = () => {
    return (
        <div>
            <video id="background-video" src={index} autoPlay loop muted />
        </div>
    );
};

export default BackgroundVideo;