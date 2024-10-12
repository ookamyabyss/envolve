import React, { useState, useEffect } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Som de sucesso
import failSound from '../../../assets/sounds/fail.mp3'; // Som de falha
import './ImageSelection.css'; // Estilos

// Importa todas as imagens de uma pasta
const importAll = (r) => r.keys().map((fileName) => ({
    name: fileName.replace('./', '').replace(/\.\w+$/, ''),
    src: r(fileName),
}));

const allImages = importAll(require.context('../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

const ImageSelection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [shuffledImages, setShuffledImages] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    // Embaralha as imagens e define a resposta correta
    const shuffleImages = () => {
        const shuffled = allImages.sort(() => 0.5 - Math.random()).slice(0, 6);
        setShuffledImages(shuffled);
        setCorrectAnswer(shuffled[Math.floor(Math.random() * shuffled.length)].name);
    };

    useEffect(() => {
        shuffleImages(); // Embaralha as imagens ao montar o componente
    }, []);

    // Função para tocar um som específico
    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    // Função para lidar com o clique na imagem
    const handleImageClick = (imageName) => {
        setSelectedImage(imageName);
        if (imageName === correctAnswer) {
            playSound(successSound);
            setTimeout(() => {
                shuffleImages(); // Embaralha as imagens novamente após 1 minuto
                setSelectedImage(null); // Reseta a seleção
            }, 60000); // 60000 milissegundos = 1 minuto
        } else {
            playSound(failSound);
        }
    };

    // Função para determinar a cor da borda com base na imagem selecionada
    const getBorderColor = (imageName) => {
        if (selectedImage === imageName) {
            return imageName === correctAnswer ? 'lime' : 'red';
        }
        return 'transparent';
    };

    return (
        <div className="image-selection-container">

            <div className="box-1">
                <p className="message-box">Escolha a imagem correta :</p>
                <p className="message-box-2">{correctAnswer.toUpperCase()}</p>


                <div className="image-grid">
                    {shuffledImages.map((image, index) => (
                        <div
                            key={index}
                            className="selection-image-container-3"
                            style={{ borderColor: getBorderColor(image.name) }}
                            onClick={() => handleImageClick(image.name)}
                        >
                            <img src={image.src} alt={image.name} className="selection-image" />
                            {selectedImage === image.name && image.name === correctAnswer && (
                                <div className="chat-bubble-fist">
                                    Você escolheu certo!
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default ImageSelection;
