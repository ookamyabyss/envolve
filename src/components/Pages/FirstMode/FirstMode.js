import React, { useState, useEffect } from 'react';

// Importação de componentes utilitários para o layout da página Home
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import FirstModeCarousel from '../../Utils/FirstModeCarousel/FirstModeCarousel';
import clickSound from '../../../assets/sounds/click.mp3'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import starImage from '../../../assets/stars/star.png'; // Caminho da imagem da estrela
import './FirstMode.css'; 

// Componente FirstMode: Página de seleção de modo inicial com carrossel
const FirstMode = () => {
    const [totalStars, setTotalStars] = useState(0);
    const [userName, setUserName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true); // Para mostrar ou esconder o input de nome
    const [level, setLevel] = useState(1); // Estado para o nível do jogador

    // Função para recuperar a contagem de estrelas do sessionStorage
    const getTotalStars = () => {
        const stars = sessionStorage.getItem('totalStars');
        return stars ? parseInt(stars, 10) : 0;
    };

    // Função para recuperar o nome do sessionStorage
    const getUserName = () => {
        const name = sessionStorage.getItem('userName');
        return name ? name : '';
    };

    // Função para calcular o nível com base nas estrelas
    const calculateLevel = (stars) => {
        let currentLevel = 1;
        let starsNeeded = 10; // Estrelas necessárias para o nível 1

        while (stars >= starsNeeded) {
            currentLevel++;
            starsNeeded += 15; // Adiciona 15 estrelas para o próximo nível
        }

        return currentLevel - 1; // Subtrai 1 porque o loop aumenta além do necessário
    };

    // UseEffect para carregar estrelas e nome do sessionStorage ao iniciar
    useEffect(() => {
        const stars = getTotalStars();
        setTotalStars(stars);
        setLevel(calculateLevel(stars)); // Calcula o nível com as estrelas

        const name = getUserName();
        setUserName(name);
        setShowNameInput(!name); // Se já houver nome, não mostra o input
    }, []);

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
        <div className="first-mode">
            {/* Componente de vídeo de fundo */}
            <BackgroundVideo />

            {/* DIV no canto superior direito para exibir o total de estrelas, nome e nível */}
            <div className="hub">
                <div className="name-container">
                    <h1>{userName && `${userName}`}</h1>
                    {userName && <h2 className="level">Level {level}</h2>} {/* Mostra o nível */}
                </div>
                <p>{totalStars}</p>
                <img src={starImage} alt="Estrela" className="star-hub" />
            </div>          

            {/* Componente de carrossel com funcionalidades de navegação e seleção de nível */}
            <FirstModeCarousel 
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

export default FirstMode;
