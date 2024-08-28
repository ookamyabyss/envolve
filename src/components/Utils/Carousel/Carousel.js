import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; 
import ImageSelection from '../ImageSelection/ImageSelection';
import './Carousel.css'; 

const Carousel = ({ currentStep, handleNext, handlePrevious, handleFinish }) => {
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handlePreviousClick = () => {
        playSound();
        handlePrevious();
    };

    const handleNextClick = () => {
        playSound();
        handleNext();
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                handleNextClick();
                break;
            case 'ArrowLeft':
                handlePreviousClick();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextClick, handlePreviousClick]);

    const handleCorrectSelection = () => {
        alert('Você escolheu corretamente!'); 
    };

    // Defina os títulos e o conteúdo das etapas
    const steps = [
        {
            title: "Parte 1 do Tutorial: Escolha de Itens",
            content: <ImageSelection onCorrectSelection={handleCorrectSelection} />
        },
        {
            title: "Parte 2 do Tutorial: Como Usar o Painel",
            content: <p>Conteúdo explicando como usar o painel.</p>
        },
        {
            title: "Parte 3 do Tutorial: Resolvendo Desafios",
            content: <p>Conteúdo sobre resolver desafios.</p>
        },
        {
            title: "Parte 4 do Tutorial: Finalizando",
            content: <p>Conteúdo de finalização do tutorial.</p>
        }
    ];

    return (
        <div className="carousel-container">
            {/* Exibe o título da etapa atual */}
            <h2 className="carousel-title">{steps[currentStep - 1].title}</h2>
            {/* Exibe o conteúdo da etapa atual */}
            <div className={`carousel-step step-${currentStep}`}>
                {steps[currentStep - 1].content}
            </div>
            <div className="navigation-buttons">
                <button
                    className="btn-nav"
                    onClick={handlePreviousClick}
                    disabled={currentStep === 1}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                {currentStep === steps.length ? (
                    <button className="btn-nav finish" onClick={handleFinish}>
                        Terminar Tutorial
                    </button>
                ) : (
                    <button className="btn-nav" onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Carousel;
