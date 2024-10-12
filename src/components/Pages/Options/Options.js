<<<<<<< HEAD
import React from 'react';
import './Options.css'; // Verifique se o arquivo está presente
import BackButton from '../../Utils/BackButton/BackButton';


const Options = () => {
    return (
        <div className="options-container">
            <h1>Opções</h1>
            
            <BackButton />
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Options.css';
import backgroundImage from '../../../assets/background_options/Background_options.png';

const Options = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar a exibição da mensagem de nome alterado
    const [showConfirmReset, setShowConfirmReset] = useState(false); // Estado para controlar a exibição da confirmação de reset

    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função para lidar com o clique no botão de voltar
    const handleBackClick = () => {
        playSound();
        navigate("/");
    };

    // Carrega o nome do usuário do sessionStorage ao carregar a página
    useEffect(() => {
        const storedName = sessionStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    // Função para salvar o novo nome no sessionStorage
    const handleSaveName = () => {
        sessionStorage.setItem('userName', userName);
        setShowSuccessMessage(true); // Exibe a mensagem de sucesso

        // Oculta a mensagem após 3 segundos
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    // Função para detectar pressionamento da tecla "Enter"
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveName(); // Chama a função de salvar nome quando "Enter" for pressionado
        }
    };

    // Função para resetar o progresso do usuário (nome, estrelas e nível)
    const handleResetProgress = () => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('totalStars');
        sessionStorage.removeItem('level');

        playSound();
        navigate("/");
    };

    // Função para exibir a confirmação de reset
    const handleShowResetConfirmation = () => {
        setShowConfirmReset(true);
    };

    // Função para cancelar o reset
    const handleCancelReset = () => {
        setShowConfirmReset(false);
    };

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="options-container">
                <h1>Opções</h1>

                <h3>Troca Nome</h3>

                <div className="name-input-section">
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Digite seu nome"
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSaveName}>OK</button>
                </div>

                <div className="reset-section">
                    <h3>Reiniciar Progresso</h3>
                    <button onClick={handleShowResetConfirmation}>Apagar Save</button>
                </div>
            </div>

            <div className="options-back-menu">
                <button className="options-btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>

            {showSuccessMessage && (
                <div className="hint-sucess-message">
                    <h2>Nome Alterado!</h2>
                </div>
            )}

            {showConfirmReset && (
                <div className="confirm-reset-message">
                    <h2>Tem certeza que deseja apagar o progresso?</h2>
                    <div className="confirm-reset-buttons">
                        <button onClick={handleResetProgress}>Sim</button>
                        <button onClick={handleCancelReset}>Não</button>
                    </div>
                </div>
            )}

>>>>>>> menu
        </div>
    );
};

export default Options;
