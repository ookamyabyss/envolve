import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Extras.css';
import backgroundImage from '../../../assets/background_options/Background_options.png';
import fotoRafael from '../../../assets/colaboradores/teste.png';

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
        <div className="level-container-2" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="extras-container">
                <h1>Extras</h1>

                <h1>Desenvolvedores</h1>

                <div className="extra-grid-container">

                    <div className="extra-box-1">
                        <div className="extra-box-photo">
                            <img src={fotoRafael} alt="Foto de Rafael" />
                        </div>

                        <p className="extra-box-text">RAFAEL R. C. DA CRUZ</p>
                        <p className="extra-box-text-2">RAFAELZINHOCCRUZ@GMAIL.COM</p>
                        
                    </div>

                    
                    <div className="extra-box-1"> 
                        <div className="extra-box-photo">
                            <img src={fotoRafael} alt="Foto de Rafael" />
                        </div>

                        <p className="extra-box-text">DÉBORA A. REGO CHAVES</p>
                        <p className="extra-box-text-2">dchaves@uneb.br</p>

                    </div>

                    
                    <div className="extra-box-1">
                        <div className="extra-box-photo">
                            <img src={fotoRafael} alt="Foto de Rafael" />
                        </div>

                        <p className="extra-box-text">MONICA DE SOUZA MASSA</p>
                        <p className="extra-box-text-2">mmassa@uneb.br</p>

                    </div>


                </div>


            </div>

            <div className="extras-back-menu">
                <button className="extras-btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>
    );
};

export default Extra;

