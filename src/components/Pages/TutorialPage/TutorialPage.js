import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import clickSound from '../../../assets/sounds/click.mp3'; 
import Carousel from '../../Utils/Carousel/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './TutorialPage.css';

const TutorialPage = () => {
    // Estado para controlar o passo atual no carrossel
    const [currentStep, setCurrentStep] = useState(1);
    
    // Estado para controlar se o tutorial deve ser desativado
    const [disableTutorial, setDisableTutorial] = useState(false);

    // Função para avançar para o próximo passo do tutorial
    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Função que lida com a finalização do tutorial
    const handleFinish = () => {
        playSound();
        navigate("/"); // Volta para a página anterior
    };

    const navigate = useNavigate();

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handleBackClick = () => {
        playSound();
        navigate("/"); // Volta para a página anterior
    };

    return (
        <div className="tutorial-container">

            {/* Vídeo de fundo para a página de tutorial */}
            <BackgroundVideo />

            {/* Carrossel do tutorial que navega entre os passos */}
            <Carousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
            />

            {/* Botão de voltar para a página anterior */}
            <div className="back-tutorial">
                <button className="btn-tutorial" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>

        </div>
    );
};

export default TutorialPage;

