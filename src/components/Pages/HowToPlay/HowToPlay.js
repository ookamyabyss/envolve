import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './HowToPlay.css';
import backgroundImage from '../../../assets/background_options/Background_options.png';
import video1 from '../../../assets/videos/video_Teclado.mp4';


const HowToPlay = () => {

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
        <div className="level-container-1" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="howtoplay-container">
                <h1>Como Jogar</h1>

                <div className="howtoplay-grid-container">

                <div className="howtoplay-box-1">
                    <p className="howtoplay-box-text">Como usar o teclado.</p>
                    <video className="howtoplay-video" src={video1} type="video/mp4" controls />
                </div>

                    <div className="howtoplay-box-1">

                        <p className="howtoplay-box-text" >Como usar o mouse.</p>
                    
                    </div>

                </div>

            </div>

            <div className="howtoplay-back-menu">
                
                <button className="howtoplay-btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

            </div>



        </div>
    );
};

export default HowToPlay;
