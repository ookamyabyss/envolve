import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente FontAwesomeIcon
import { faExpand } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de expansão para tela cheia
import clickSound from '../../../assets/sounds/click.mp3'; // Caminho para o arquivo de som do clique
import './FullScreenButton.css'; // Importa os estilos personalizados para o botão

const FullScreenButton = () => { // Define o componente FullScreenButton

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
            document.exitFullscreen();
        }
    };

    return (
        <div className="menu-screen">
            {/* Botão para alternar o modo tela cheia */}
            <button className="btn-screen" onClick={handleFullScreen}>
                <FontAwesomeIcon icon={faExpand} /> {/* Ícone para indicar tela cheia */}
            </button>
        </div>
    );
};

export default FullScreenButton; // Exporta o componente FullScreenButton
