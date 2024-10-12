import React, { useState, useEffect } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Som de sucesso
import failSound from '../../../assets/sounds/fail.mp3'; // Som de falha
import './ShapeSelection.css'; // Estilos

const ShapeSelection = () => {
    const [selectedShape, setSelectedShape] = useState(null);
    const [shuffledShapes, setShuffledShapes] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    // Embaralha as formas e define a resposta correta
    const shuffleShapes = () => {
        const shapes = ['quadrado', 'elipse', 'circulo', 'retangulo', 
                        'losango', 'paralelogramo', 'pentagono-2', 'retangulo-2'];
        const shuffled = shapes.sort(() => 0.5 - Math.random()).slice(0, 6);
        setShuffledShapes(shuffled);
        setCorrectAnswer(shuffled[Math.floor(Math.random() * shuffled.length)]);
    };

    useEffect(() => {
        shuffleShapes(); // Embaralha as formas ao montar o componente
    }, []);

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        if (shape === correctAnswer) {
            playSound(successSound);
            setTimeout(() => {
                shuffleShapes();
                setSelectedShape(null);
            }, 60000);
        } else {
            playSound(failSound);
        }
    };

    const getBorderColor = (shape) => {
        if (selectedShape === shape) {
            return shape === correctAnswer ? 'lime' : 'red';
        }
        return 'transparent';
    };

    function renderShape(shape, isOutline = false) {
        const shapeStyle = isOutline
            ? { backgroundColor: 'white', border: '4px dashed #ff0000',}  // Remover a borda vermelha 
            : { backgroundColor: shape.color };  // Forma preenchida para o grid
        
        switch (shape) {
            case 'quadrado':
                return <div className="shape-3-quadrado" style={shapeStyle}></div>;      // Funciona
            case 'losango':
                return <div className="shape-3-losango" style={shapeStyle}></div>;       // Funciona
            case 'circulo':
                return <div className="shape-3-circulo" style={shapeStyle}></div>;       // Funciona
            case 'retangulo':
                return <div className="shape-3-retangulo" style={shapeStyle}></div>;     // Funciona
            case 'paralelogramo':
                return <div className="shape-3-paralelogramo" style={shapeStyle}></div>; // Funciona
            case 'elipse':
                return <div className="shape-3-elipse" style={shapeStyle}></div>;        // Funciona
            case 'pentagono-2':
                return <div className="shape-3-pentagono-2" style={shapeStyle}></div>;   // Funciona
            case 'retangulo-2':
                return <div className="shape-3-retangulo-2" style={shapeStyle}></div>;   // Funciona
            default:
                return null;
        }
    }      

    return (
        <div className="container">

            <div className="box-5">

                <div className="instructions">
                    <p className="message-box">Complete a imagem abaixo: </p>
                </div>

                <div className="selection-container">
                    <div className="image-grid-3">
                        {shuffledShapes.map((shape, index) => (
                            <div
                                key={index}
                                className="selection-image-container"
                                style={{ borderColor: getBorderColor(shape) }}
                                onClick={() => handleShapeClick(shape)}
                            >
                                {renderShape(shape, false)}
                                {selectedShape === shape && shape === correctAnswer && (
                                    <div className="chat-bubble-fist">
                                        Você escolheu certo!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Imagem incompleta com o espaço faltando */}
                    <div className="incomplete-image-3">
                        <div className="square">
                            {/* O triângulo faltando */}
                            <div className="missing-shape-3">
                                <div style={{ width: '150%', height: '150%', display: 'flex', 
                                            justifyContent: 'center', alignItems: 'center' }}>
                                    {renderShape(correctAnswer, true)}  {/* Exibe apenas as bordas */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ShapeSelection;