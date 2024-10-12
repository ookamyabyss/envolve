import React from 'react';
import './ChallengeTitle.css';

const ChallengeTitle = () => {
    return (
        <div className="challenge-title-container">
            {/* Título principal do desafio */}
            <h3 className="challenge-game-title">ENVOLVE</h3>
            {/* Subtítulo do desafio */}
            <p className="challenge-game-sub-title">Modo Desafio</p>
        </div>
    )
}

export default ChallengeTitle;
