import React, { useState } from 'react';
<<<<<<< HEAD
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import './TutorialPage.css';
import BackButton from '../../Utils/BackButton/BackButton';
import Carousel from '../../Utils/Carousel/Carousel';

const TutorialPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [disableTutorial, setDisableTutorial] = useState(false);

=======
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
>>>>>>> menu
    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

<<<<<<< HEAD
=======
    // Função para voltar ao passo anterior do tutorial
>>>>>>> menu
    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

<<<<<<< HEAD
    const handleFinish = () => {
        const confirmFinish = window.confirm('Você realmente quer terminar o tutorial?');
        if (confirmFinish) {
            // Lógica para finalizar o tutorial
            // Por exemplo, você pode redirecionar para a página principal ou salvar a configuração
        }
    };

    const handleDisableTutorial = (e) => {
        setDisableTutorial(e.target.checked);
    };

    const closeMessage = () => {
        setDisableTutorial(false);
=======
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
>>>>>>> menu
    };

    return (
        <div className="tutorial-container">
<<<<<<< HEAD
            <BackgroundVideo />

            {disableTutorial && (
                <div className="disable-message">
                    <p>Você quer desabilitar o tutorial?</p>
                    <input 
                        type="checkbox" 
                        checked={disableTutorial} 
                        onChange={handleDisableTutorial} 
                    /> Sim
                    <button onClick={closeMessage} className="close-button">X</button>
                </div>
            )}

=======
            {/* Vídeo de fundo para a página de tutorial */}
            <BackgroundVideo />

            {/* Carrossel do tutorial que navega entre os passos */}
>>>>>>> menu
            <Carousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
            />

<<<<<<< HEAD
            <BackButton />
=======
            {/* Botão de voltar para a página anterior */}
            <div className="back-tutorial">
                <button className="btn-tutorial" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
>>>>>>> menu
        </div>
    );
};

<<<<<<< HEAD
export default TutorialPage;
=======
export default TutorialPage;
>>>>>>> menu
