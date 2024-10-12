<<<<<<< HEAD
import React from 'react';
import './Extras.css'; // Verifique se o arquivo está presente
import BackButton from '../../Utils/BackButton/BackButton';


const Extras = () => {
    return (
        <div className="extras-container">
            <h1>Extras</h1>

            <BackButton />
            
=======
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Extras.css';
import backgroundImage from '../../../assets/background_options/Background_options.png';

const Extra = () => {

    const navigate = useNavigate();

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

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="extras-container">
                <h1>Extras</h1>


            </div>

            <div className="extras-back-menu">
                <button className="extras-btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>



>>>>>>> menu
        </div>
    );
};

<<<<<<< HEAD
export default Extras;
=======
export default Extra;
>>>>>>> menu
