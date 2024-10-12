import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './FullScreenButton.css'; // Estilos personalizados para o botão

const FullScreenButton = () => {  // Renomeie de BackButton para FullScreenButton
    const navigate = useNavigate();

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handleFullScreen = () => {
        playSound();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
=======
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente FontAwesomeIcon
import { faExpand } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de expansão para tela cheia
import clickSound from '../../../assets/sounds/click.mp3'; // Caminho para o arquivo de som do clique
import './FullScreenButton.css'; // Importa os estilos personalizados para o botão

const FullScreenButton = () => { // Define o componente FullScreenButton
    const navigate = useNavigate(); // Cria uma instância do hook useNavigate

    // Função para tocar o som do clique
    const playSound = () => {
        const audio = new Audio(clickSound); // Cria um novo objeto Audio com o som do clique
        audio.play(); // Reproduz o som
    };

    // Função para alternar entre o modo tela cheia e o modo normal
    const handleFullScreen = () => {
        playSound(); // Toca o som do clique
        if (!document.fullscreenElement) {
            // Se não está em tela cheia, solicita tela cheia
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            // Se já está em tela cheia, sai do modo tela cheia
>>>>>>> menu
            document.exitFullscreen();
        }
    };

    return (
        <div className="menu-screen">
<<<<<<< HEAD
            <button className="btn-screen" onClick={handleFullScreen}>
                <FontAwesomeIcon icon={faExpand} /> 
=======
            {/* Botão para alternar o modo tela cheia */}
            <button className="btn-screen" onClick={handleFullScreen}>
                <FontAwesomeIcon icon={faExpand} /> {/* Ícone para indicar tela cheia */}
>>>>>>> menu
            </button>
        </div>
    );
};

<<<<<<< HEAD
export default FullScreenButton; 
=======
export default FullScreenButton; // Exporta o componente FullScreenButton
>>>>>>> menu
