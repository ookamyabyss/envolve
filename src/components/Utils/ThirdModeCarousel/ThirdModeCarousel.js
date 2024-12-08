import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; 
import './ThirdModeCarousel.css'; 

const ThirdModeCarousel = ({ currentStep, handleNext, handlePrevious }) => {
    const navigate = useNavigate();

    // Função para tocar o som do clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Manipulador de clique para o botão "Anterior"
    const handlePreviousClick = () => {
        playSound();
        handlePrevious();
    };

    // Manipulador de clique para o botão "Próximo"
    const handleNextClick = () => {
        playSound();
        handleNext();
    };

    // Manipulador de clique para selecionar um nível específico
    const handleLevelSelect = (level) => {
        playSound();
        console.log(`Navigating to level: ${level}`);
        navigate(`/third-mode-level/${level}`);
    };

    // Função para lidar com as teclas de seta do teclado
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                if (currentStep < steps.length) {
                    handleNextClick();
                }
                break;
            case 'ArrowLeft':
                if (currentStep > 1) {
                    handlePreviousClick();
                }
                break;
            default:
                break;
        }
    };

    // Adiciona e remove o event listener para as teclas de seta
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentStep]);

    // Define os passos do carrossel
    const steps = [
        {
            title: 'LEVEL 1',
            content: (
                <div className="level-description">
                    <p> 8 MINUTOS </p>
                    <p> 4 FORMAS </p>
                    <div className="tips-count-2">2 DICAS</div>
                </div>
            ),
        },
        {
            title: 'LEVEL 2',
            content: (
                <div className="level-description">
                    <p> 5 MINUTOS </p>
                    <p> 6 FORMAS </p>
                    <div className="tips-count-2">2 DICAS</div>
                </div>
            ),
        },
        {
            title: 'LEVEL 3',
            content: (
                <div className="level-description">
                    <p> 5 MINUTOS </p>
                    <p> 8 FORMAS </p>
                    <p> EMBARALHANDO </p>
                    <div className="tips-count-2">2 DICAS</div>
                </div>
            ),
        },
        {
            title: 'LEVEL 4',
            content: (
                <div className="level-description">
                    <p> 5 MINUTOS </p>
                    <p> 8 FORMAS </p>
                    <p> EMBARALHANDO </p>
                    <div className="tips-count-2">10 DICAS</div>
                </div>
            ),
        },
        {
            title: 'LEVEL 5',
            content: (
                <div className="level-description">
                    <p> 5 MINUTOS </p>
                    <p> 8 FORMAS </p>
                    <p> EMBARALHANDO </p>
                    <div className="tips-count-2">10 DICAS</div>
                </div>
            ),
        },

    ];

    // Retorna null se o passo atual estiver fora do intervalo
    if (currentStep < 1 || currentStep > steps.length) {
        return null;
    }

    return (
        <div className={`third-carousel-container level-${currentStep}`}>
            <h2 className="carousel-title">{steps[currentStep - 1].title}</h2>
            <div className={`carousel-step step-${currentStep}`}>
                {steps[currentStep - 1].content}
            </div>
            <div className="navigation-buttons">
                {/* Botão "Anterior", desativado se estiver no primeiro passo */}
                {currentStep > 1 ? (
                    <button
                        className="btn-nav"
                        onClick={handlePreviousClick}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                ) : (
                    <button className="btn-nav disabled" />
                )}
                {/* Botão para selecionar o nível atual */}
                <button 
                    className="btn-nav level-button"
                    onClick={() => handleLevelSelect(currentStep)}
                >
                    LEVEL {currentStep}
                </button>
                {/* Botão "Próximo", desativado se estiver no último passo */}
                {currentStep < steps.length ? (
                    <button className="btn-nav" onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                ) : (
                    <button className="btn-nav disabled" />
                )}
            </div>
        </div>
    );
    
};

export default ThirdModeCarousel;