import React, { useState } from 'react';
import './FloatingMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3';
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
    };

    return (
        <div className="floating-menu">
            <button className="btn-plus" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isVisible ? faMinus : faPlus} />
            </button>
            {isVisible && (
                <div className="menu-content">
                    <button className="btn-home" onClick={handleHowToPlayClick}>How To Play</button>
                    <button className="btn-home" onClick={handleExtrasClick}>Extras</button>
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;
