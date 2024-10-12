import React, { useState } from 'react';
import './FloatingMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; // Certifique-se de importar o hook useNavigate

const FloatingMenu = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const toggleMenu = () => {
        playSound();
        setIsVisible(!isVisible);
    };

    const handleHowToPlayClick = () => {
        playSound();
        navigate('/how-to-play');
    };

    const handleExtrasClick = () => {
        playSound();
        navigate('/extras');
=======
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

const FloatingMenu = () => {
    const navigate = useNavigate(); // Cria uma instância do hook useNavigate
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade do menu

    // Função para tocar o som do clique
    const playSound = () => {
        const audio = new Audio(clickSound); // Cria um novo objeto Audio com o som de clique
        audio.play(); // Reproduz o som
    };

    // Função para alternar a visibilidade do menu
    const toggleMenu = () => {
        playSound(); // Toca o som ao clicar
        setIsVisible(!isVisible); // Alterna o estado de visibilidade
    };

    // Função para navegar para a página "How To Play"
    const handleHowToPlayClick = () => {
        playSound(); // Toca o som ao clicar
        navigate('/how-to-play'); // Navega para a página de instruções
    };

    // Função para navegar para a página "Extras"
    const handleExtrasClick = () => {
        playSound(); // Toca o som ao clicar
        navigate('/extras'); // Navega para a página de extras
>>>>>>> menu
    };

    return (
        <div className="floating-menu">
<<<<<<< HEAD
            <button className="btn-plus" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isVisible ? faMinus : faPlus} />
            </button>
            {isVisible && (
                <div className="menu-content">
                    <button className="btn-home" onClick={handleHowToPlayClick}>How To Play</button>
=======
            {/* Botão para alternar a visibilidade do menu */}
            <button className="btn-plus" onClick={toggleMenu}>
                {/* Ícone de + ou - dependendo da visibilidade do menu */}
                <FontAwesomeIcon icon={isVisible ? faMinus : faPlus} />
            </button>
            {/* Conteúdo do menu, exibido apenas se isVisible for true */}
            {isVisible && (
                <div className="menu-content">
                    {/* Botão para navegar para a página "How To Play" */}
                    <button className="btn-home" onClick={handleHowToPlayClick}>Como Jogar</button>
                    {/* Botão para navegar para a página "Extras" */}
>>>>>>> menu
                    <button className="btn-home" onClick={handleExtrasClick}>Extras</button>
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;
