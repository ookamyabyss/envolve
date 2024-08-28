import React, { useState } from 'react';
import gaivotaImg from '../../../assets/imagens_tutorial/gaviota.png';
import skateImg from '../../../assets/imagens_tutorial/skate.png';
import morangoImg from '../../../assets/imagens_tutorial/morango.png';
import picoleImg from '../../../assets/imagens_tutorial/picole.png';
import successSound from '../../../assets/sounds/success.mp3';
import failSound from '../../../assets/sounds/fail.mp3';
import './ImageSelection.css'; // CSS para estilização

const ImageSelection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const correctAnswer = 'picole'; // Resposta correta

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleImageClick = (imageName) => {
        setSelectedImage(imageName);
        if (imageName === correctAnswer) {
            playSound(successSound);
        } else {
            playSound(failSound);
        }
    };

    const getBorderColor = (imageName) => {
        if (selectedImage === imageName) {
            return imageName === correctAnswer ? 'green' : 'red';
        }
        return 'transparent';
    };

    return (
        <div className="image-selection-container">
            <p className="message-box">Escolha a imagem do picolé</p>
            <div className="image-grid">
                {[
                    { name: 'gaivota', src: gaivotaImg },
                    { name: 'skate', src: skateImg },
                    { name: 'morango', src: morangoImg },
                    { name: 'picole', src: picoleImg }
                ].map((image, index) => (
                    <div 
                        key={index} 
                        className="selection-image-container" 
                        style={{ borderColor: getBorderColor(image.name) }}
                        onClick={() => handleImageClick(image.name)}
                    >
                        <img
                            src={image.src}
                            alt={image.name}
                            className="selection-image"
                        />
                        {selectedImage === image.name && image.name === correctAnswer && (
                            <div className="chat-bubble">
                                Você escolheu certo.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSelection;
