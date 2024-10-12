import React, { useState, useEffect } from 'react';

// Importação de componentes utilitários para o layout da página Home
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa ícones FontAwesome
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de seta para a esquerda
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo'; // Importa o componente de vídeo de fundo
import ChallengeTitle from '../../Utils/ChallengeTitle/ChallengeTitle'; // Importa o componente de título do desafio
import Mode from '../../Utils/Mode/Mode'; // Importa o componente de seleção de modo
import clickSound from '../../../assets/sounds/click.mp3'; // Importa o som de clique
import starImage from '../../../assets/stars/star.png'; // Caminho da imagem da estrela
import './ChallengeModeSelection.css'; // Importa o CSS para estilização

const ChallengeModeSelection = () => {

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

    // Função para salvar o nome do usuário no sessionStorage


    // Hook para navegação
    const navigate = useNavigate();

    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função para lidar com o clique no botão de voltar
    const handleBackClick = () => {
        playSound(); // Toca o som de clique
        navigate("/"); // Navega para a página inicial
    };

    return (
        <div className="challenge-mode-selection">
            {/* Componente que exibe o título do desafio */}
            <ChallengeTitle/>
            
            {/* Componente que exibe o vídeo de fundo */}
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
            
            {/* Componente que exibe as opções de modo */}
            <Mode />
            
            {/* Contêiner para o botão de voltar */}
            <div className="back-menu">
                <button className="btn-back" onClick={handleBackClick}>
                    {/* Ícone de seta para a esquerda */}
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>
    );
};

export default ChallengeModeSelection;
