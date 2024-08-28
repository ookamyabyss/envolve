import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './BackButton.css'; // Estilos personalizados para o botão

const BackButton = () => {
    const navigate = useNavigate();

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handleBackClick = () => {
        playSound();
        navigate(-1); // Volta para a página anterior
    };

    return (

        <div className="floating-menu">
            <div className="back-menu">
                <button className="btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>    
    );
};

export default BackButton;