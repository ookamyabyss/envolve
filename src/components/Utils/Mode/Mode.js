import React from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import './Mode.css';

const Mode = () => {
    const navigate = useNavigate();

    const playSoundAndNavigate = (path) => {
        const audio = new Audio(clickSound);
        audio.play();
        navigate(path);
    };


    return (
        <div className="menu-mode">
            <button className="btn-mode" onClick={() => playSoundAndNavigate('/mode1')}>Modo 1</button>

            <button className="btn-mode" onClick={() => playSoundAndNavigate('/mode2')}>Modo 2</button>

            <button className="btn-mode" onClick={() => playSoundAndNavigate('/mode3')}>Modo 3</button>
            
        </div>
    );
};

export default Mode;
