import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; 
import ImageSelection from '../ImageSelection/ImageSelection';
<<<<<<< HEAD
import './Carousel.css'; 

const Carousel = ({ currentStep, handleNext, handlePrevious, handleFinish }) => {
=======
import TypingTutorial from '../TypingTutorial/TypingTutorial';
import ShapeSelection from '../ShapeSelection/ShapeSelection';
import ControlsTutorial from '../ControlsTutorial/ControlsTutorial';
import './Carousel.css'; 

const Carousel = ({ currentStep, handleNext, handlePrevious, handleFinish }) => {
    // Função para tocar o som de clique
>>>>>>> menu
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

<<<<<<< HEAD
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
=======
    // Função chamada ao clicar no botão de "anterior"
    const handlePreviousClick = () => {
        playSound(); // Toca o som de clique
        handlePrevious(); // Chama a função para ir para o passo anterior
    };

    // Função chamada ao clicar no botão de "próximo"
    const handleNextClick = () => {
        playSound(); // Toca o som de clique
        handleNext(); // Chama a função para ir para o próximo passo
    };

    // Função para lidar com eventos de teclado
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                handleNextClick(); // Vai para o próximo passo se a tecla for a seta para a direita
                break;
            case 'ArrowLeft':
                handlePreviousClick(); // Vai para o passo anterior se a tecla for a seta para a esquerda
>>>>>>> menu
                break;
            default:
                break;
        }
    };

<<<<<<< HEAD
=======
    // Adiciona e remove o event listener para o teclado quando o componente é montado e desmontado
>>>>>>> menu
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextClick, handlePreviousClick]);

<<<<<<< HEAD
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
=======

    // Definição dos títulos e do conteúdo das etapas
    const steps = [
        {
            title: "Parte 1 : Escolha de Itens",
            content: <ImageSelection/>
        },
        {
            title: "Parte 2 : Escrevendo",
            // Aqui, passe a função handleCorrectTyping para o componente TypingTutorial
            content: <TypingTutorial/>
        },
        {
            title: "Parte 3 : Complete a Imagem ",
            content: <ShapeSelection/>
        },
        {
            title: "Parte 4 : Pausa || ... Ajuda ?",
            content: <ControlsTutorial/>
>>>>>>> menu
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
<<<<<<< HEAD
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
=======
            <div className="tutorial-navigation-buttons">
                {/* Botão para ir para o passo anterior - escondido quando no primeiro passo */}
                {currentStep > 1 && (
                    <button
                        className="btn-tutorial-nav"
                        onClick={handlePreviousClick}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                )}
                {/* Botão para terminar o tutorial ou para ir para o próximo passo */}
                {currentStep === steps.length ? (
                    <button className="btn-tutorial-fim" onClick={handleFinish}>
                        FIM
                    </button>
                ) : (
                    <button className="btn-tutorial-nav" onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                )}
                
            </div>

        </div>

    );
};

export default Carousel;
>>>>>>> menu
