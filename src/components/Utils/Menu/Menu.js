import React from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './Menu.css'; // Importa o CSS para estilização do menu

const Menu = () => {
    const navigate = useNavigate(); // Hook para navegação de páginas

    // Função para tocar o som e navegar para a rota especificada
    const playSoundAndNavigate = (path) => {
        const audio = new Audio(clickSound); // Cria um novo objeto de áudio
        audio.play(); // Toca o som
        navigate(path); // Navega para a rota especificada
    };

    return (
        <div className="menu"> {/* Contêiner principal do menu */}
            {/* Botão para navegar para o tutorial */}
            <button className="btn-home" onClick={() => playSoundAndNavigate('/tutorial')}>Tutorial</button>
            {/* Botão para navegar para o modo desafio */}
            <button className="btn-home" onClick={() => playSoundAndNavigate('/challenge-mode-selection')}>Modo Desafio</button>
            {/* Botão para navegar para as opções */}
            <button className="btn-home" onClick={() => playSoundAndNavigate('/options')}>Opções</button>
            {/* Botão para sair do aplicativo */}
            <button className="btn-home" onClick={() => window.location.href = 'about:blank'}>Sair</button>
            </div>
    );
};

export default Menu;
