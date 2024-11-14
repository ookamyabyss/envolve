import React, { useState, useEffect } from 'react';

// Importação de componentes utilitários para o layout da página Home
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import Menu from '../../Utils/Menu/Menu';
import FloatingMenu from '../../Utils/FloatingMenu/FloatingMenu';
import FullScreenButton from '../../Utils/FullScreenButton/FullScreenButton';
import GameTitle from '../../Utils/GameTitle/GameTitle';
import starImage from '../../../assets/stars/star.png'; // Caminho da imagem da estrela
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
    // Estados para estrelas, nome do usuário e nível
    const [totalStars, setTotalStars] = useState(0);
    const [userName, setUserName] = useState(''); // Nome salvo
    const [tempUserName, setTempUserName] = useState(''); // Nome temporário do input
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
        setTempUserName(name); // Inicializa o nome temporário
        setShowNameInput(!name); // Se já houver nome, não mostra o input
    }, []);

    // Função para salvar o nome do usuário no sessionStorage
    const handleSaveName = () => {
        if (tempUserName.trim()) { // Verifica se o nome temporário não está vazio
            sessionStorage.setItem('userName', tempUserName);
            setUserName(tempUserName); // Atualiza o nome real
        }
        setShowNameInput(false);
    };

    // Função para fechar o input de nome
    const handleCloseInput = () => {
        setShowNameInput(false); // Apenas fecha sem salvar
    };

    // Função para lidar com a tecla pressionada
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveName();
        }
    };

    return (
        <div className="Home">
            <GameTitle />
            <BackgroundVideo />
    
            {/* Exibir a div do nome se ainda não foi preenchido */}
            {showNameInput && (
                <div className="name-input-popup">
                    
                    <button className="close-button-3" onClick={handleCloseInput}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <h2>Digite seu nome no campo abaixo RR.</h2>
    
                    <input 
                        type="text" 
                        placeholder="...." 
                        value={tempUserName} // Usa o estado temporário
                        onChange={(e) => setTempUserName(e.target.value)} 
                        onKeyDown={handleKeyDown} // Adiciona o manipulador de tecla aqui
                    />
                    <button onClick={handleSaveName}>OK</button>
                </div>
            )}
    
            {/* DIV no canto superior direito para exibir o total de estrelas, nome e nível */}
            <div className="hub">
                <div className="name-container">
                    <h1>{userName && `${userName}`}</h1>
                    {userName && <h2 className="level">Level {level}</h2>} {/* Mostra o nível */}
                </div>
                <p>{totalStars}</p>
                <img src={starImage} alt="Estrela" className="star-hub" />
            </div>

            <Menu />
            <FloatingMenu />
            <FullScreenButton />
        </div>
    );
};

export default Home;
