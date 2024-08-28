import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './FullScreenButton.css'; // Estilos personalizados para o botão

const FullScreenButton = () => {  // Renomeie de BackButton para FullScreenButton
    const navigate = useNavigate();

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handleFullScreen = () => {
        playSound();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <div className="menu-screen">
            <button className="btn-screen" onClick={handleFullScreen}>
                <FontAwesomeIcon icon={faExpand} /> 
            </button>
        </div>
    );
};

export default FullScreenButton; 