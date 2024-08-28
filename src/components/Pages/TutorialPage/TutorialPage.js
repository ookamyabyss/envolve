import React, { useState } from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import './TutorialPage.css';
import BackButton from '../../Utils/BackButton/BackButton';
import Carousel from '../../Utils/Carousel/Carousel';

const TutorialPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [disableTutorial, setDisableTutorial] = useState(false);

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

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
    };

    return (
        <div className="tutorial-container">
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

            <Carousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
            />

            <BackButton />
        </div>
    );
};

export default TutorialPage;
