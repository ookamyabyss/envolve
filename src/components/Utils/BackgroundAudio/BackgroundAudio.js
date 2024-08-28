import React from 'react';
import backgrondMenu from '../../../assets/sounds/backgrondMenu.mp3';

const BackgroundAudio = () => {
    return (
        <div>
            <audio id="background-audio" src={backgrondMenu} autoPlay loop />
        </div>
    );
};


export default BackgroundAudio;