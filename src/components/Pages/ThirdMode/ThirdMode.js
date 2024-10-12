import React, { useState } from 'react';

// Importação de componentes utilitários para o layout da página Home
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import ThirdModeCarousel from '../../Utils/ThirdModeCarousel/ThirdModeCarousel';
import clickSound from '../../../assets/sounds/click.mp3'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './ThirdMode.css'; 

// Componente FirstMode: Página de seleção de modo inicial com carrossel
const ThirdMode = () => {
    // Estado para rastrear o passo atual do carrossel
    const [currentStep, setCurrentStep] = useState(1);

    // Hook para navegação entre páginas
    const navigate = useNavigate();

    // Função para avançar para o próximo passo, limitando ao máximo de 10 passos
    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 10));
    };

    // Função para voltar ao passo anterior, garantindo que não fique abaixo de 1
    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    // Função para finalizar o tutorial e executar lógica adicional
    const handleFinish = () => {
        console.log('Tutorial finalizado');
        // Adicione aqui a lógica para o que deve acontecer ao finalizar o tutorial
    };

    // Função para selecionar um nível específico e navegar para a seleção de nível
    const handleLevelSelect = (level) => {
        console.log(`Level ${level} selecionado`);
        // Navegação para o nível específico
        // No carrossel, isso já está lidado com navigate no handleLevelSelect
    };

    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função para lidar com o clique no botão de voltar, tocando o som e navegando para a página anterior
    const handleBackClick = () => {
        playSound();
        navigate("/challenge-mode-selection"); 
    };

    return (
        <div className="third-mode">
            {/* Componente de vídeo de fundo */}
            <BackgroundVideo />

            {/* Componente de carrossel com funcionalidades de navegação e seleção de nível */}
            <ThirdModeCarousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
                handleLevelSelect={handleLevelSelect}
            />

            {/* Botão de voltar para a página anterior */}
            <div className="back-menu">
                <button className="btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>
    );
};

export default ThirdMode;
