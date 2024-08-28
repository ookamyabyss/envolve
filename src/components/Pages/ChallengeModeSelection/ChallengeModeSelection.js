import React from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import Mode from '../../Utils/Mode/Mode';
import BackButton from '../../Utils/BackButton/BackButton';
import './ChallengeModeSelection.css'; 

const ChallengeModeSelection = () => {

    return (
        <div className="challenge-mode-selection">
            <BackgroundVideo />
            <Mode />
            <BackButton />
        </div>
    );
};

export default ChallengeModeSelection;
