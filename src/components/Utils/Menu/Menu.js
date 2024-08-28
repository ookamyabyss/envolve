import React from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();

    const playSoundAndNavigate = (path) => {
        const audio = new Audio(clickSound);
        audio.play();
        navigate(path);
    };

    return (
        <div className="menu">
            <button className="btn-home" onClick={() => playSoundAndNavigate('/tutorial')}>Modo História</button>
            <button className="btn-home" onClick={() => playSoundAndNavigate('/challenge-mode-selection')}>Modo Desafio</button>
            <button className="btn-home" onClick={() => playSoundAndNavigate('/options')}>Opções</button>
            <button className="btn-home" onClick={() => playSoundAndNavigate('/exit')}>Sair</button>
        </div>
    );
};

export default Menu;
