import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3'; // Som para cliques
import successSound from '../../../../assets/sounds/success.mp3'; // Som para escolhas certas
import errorSound from '../../../../assets/sounds/click.mp3'; // Som para escolhas erradas
import starImage from '../../../../assets/stars/star.png'; // Imagem da estrela colorida
import starGrayImage from '../../../../assets/stars/star-gray.png'; // Imagem da estrela cinza
import backgroundImage from '../../../../assets/background_levels/ThirdModeOne_Two.png'; // Imagem de fundo do nível
import './FiveLevel.css'; // Arquivo de estilos do nível

const FiveLevel = () => {
    // Estado do nível, inicializado com 1
    const [level, setLevel] = useState(1);

    const navigate = useNavigate(); // Importa o hook useNavigate do React Router para permitir a navegação entre páginas
    const [timeRemaining, setTimeRemaining] = useState(300); // Estado que controla o tempo restante do nível, inicializado em 480 segundos (8 minutos)
    const [gameStatus, setGameStatus] = useState('playing'); // Estado que controla o status do jogo, iniciado como 'playing' (jogando)
    const [isPaused, setIsPaused] = useState(false); // Estado que indica se o jogo está pausado, iniciado como false
    const [stars, setStars] = useState(0); // Estado que armazena a quantidade de estrelas conquistadas
    const [hintsUsed, setHintsUsed] = useState(0); // Estado que registra o número de dicas usadas
    const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Estado que controla a exibição da mensagem de limite de dicas atingido
    const [leftShapes, setLeftShapes] = useState([]); // Estado que armazena as formas exibidas à esquerda
    const [rightShapes, setRightShapes] = useState([]); // Estado que armazena as formas exibidas à direita
    const [selectedShape, setSelectedShape] = useState(null); // Estado que armazena a forma atualmente selecionada pelo jogador
    const [correctShapes, setCorrectShapes] = useState([]); // Agora são 4 formas corretas
    const [selectedCorrectShapes, setSelectedCorrectShapes] = useState([]); // Armazena as formas corretas já selecionadas pelo jogador
    const [selectedIncorrectShapes, setSelectedIncorrectShapes] = useState([]); // Estado para armazenar formas incorretas
    const [highlightedShape, setHighlightedShape] = useState(null); // Forma destacada

    const [totalStars, setTotalStars] = useState(0);


    const MAX_HINTS = 2 + (level - 1); // Dicas permitidas ajustadas pelo nível

    // Lista de formas disponíveis que podem ser usadas no jogo
    const shapes = ['quadrado', 'elipse', 'circulo', 'retangulo', 'losango', 'paralelogramo', 'pentagono-2', 
                    'retangulo-2', 'oval', 'paralelogramo-simples'];

    // Função para calcular o nível com base nas estrelas
    const calculateLevel = (stars) => {
        let currentLevel = 1;
        let starsNeeded = 10;

        while (stars >= starsNeeded) {
            currentLevel++;
            starsNeeded += 15;
        }

        return currentLevel;
    };

    // Função para recuperar a contagem de estrelas do sessionStorage
    const getTotalStars = () => {
        const stars = sessionStorage.getItem('totalStars');
        return stars ? parseInt(stars, 10) : 0;
    };

    // Função para adicionar estrelas ao sessionStorage
    const addStars = (stars) => {
        const currentStars = getTotalStars();
        const newTotal = currentStars + stars;
        sessionStorage.setItem('totalStars', newTotal);
        setTotalStars(newTotal); // Atualiza o estado local também
    };
    //...
    useEffect(() => {
        // Função que embaralha as formas de ambos os lados
        const shuffleBothSides = () => {
            const shuffledLeftShapes = shuffleShapes(shapes.slice()).slice(0, 10);
            const shuffledRightShapes = shuffleShapes(shapes.slice()).slice(0, 10);
            setLeftShapes(shuffledLeftShapes);
            setRightShapes(shuffledRightShapes);
        };
    
        // Define o temporizador para embaralhar a cada 20 segundos
        const shuffleInterval = setInterval(() => {
            shuffleBothSides();
        }, 2000); // 20000ms = 20 segundos
    
        // Limpa o temporizador ao desmontar o componente
        return () => clearInterval(shuffleInterval);
    }, []);

    // Função que roda ao montar o componente para atualizar totalStars e o nível
    useEffect(() => {
        const starsFromStorage = getTotalStars();
        const currentLevel = calculateLevel(starsFromStorage);
        setLevel(currentLevel);
        setTimeRemaining(300 + (currentLevel - 1) * 30); // Ajusta o tempo inicial baseado no nível
    }, []);

    useEffect(() => {
        // Escolhe 4 formas corretas aleatoriamente
        const randomCorrectShapes = [];
        while (randomCorrectShapes.length < 8) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (!randomCorrectShapes.includes(shape)) {
                randomCorrectShapes.push(shape);
            }
        }
        setCorrectShapes(randomCorrectShapes);

        // Embaralha as formas para garantir 8 em cada lado
        const shuffledLeftShapes = shuffleShapes(shapes.slice()).slice(0, 10);
        const shuffledRightShapes = shuffleShapes(shapes.slice()).slice(0, 10);

        setLeftShapes(shuffledLeftShapes);
        setRightShapes(shuffledRightShapes);
    }, []);

    // useEffect que controla o temporizador do jogo
    useEffect(() => {
        if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setGameStatus('lost');
        }
    }, [timeRemaining, gameStatus, isPaused]);

    // Altere para renderizar 4 formas na imagem incompleta, cada uma em uma posição diferente
    const renderMissingShapes = () => {
        const positions = [
            { top: '5%', left: '5%' },
            { top: '5%', right: '5%' },
            { bottom: '5%', left: '5%' },
            { bottom: '5%', right: '5%' },
            { top: '20%', left: '50%' },
            { top: '20%', right: '50%' },
            { bottom: '20%', left: '50%' },
            { bottom: '20%', right: '50%' },
        ];  // Posições fixas para garantir que não se sobreponham

        return correctShapes.map((shape, index) => (
            <div key={index} className="missing-shape-1" style={{ position: 'absolute', ...positions[index] }}>
                <div style={{ width: '250%', height: '250%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderShape(shape, true)} {/* Renderiza a borda da forma correta */}
                </div>
            </div>
        ));
    };

    // Função que embaralha um array de formas
    const shuffleShapes = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Função chamada quando o nível é finalizado, atualiza as estrelas e as salva
    const handleFinishLevel = (earnedStars) => {
        setStars(earnedStars);  // Atualizar o estado das estrelas
        addStars(earnedStars);  // Salvar o total de estrelas no sessionStorage
    };

    // Função que renderiza uma forma com base no seu tipo e estilo
    const renderShape = (shape, isOutline = false) => {
        const shapeStyle = isOutline
            ? { backgroundColor: 'white', border: '4px dashed #ff0000' }
            : { backgroundColor: shape.color };  // Forma preenchida para o grid
        
    
        // Adiciona a borda verde se a forma estiver destacada
    
        switch (shape) {
            case 'quadrado':
                return <div className="shape-3-quadrado" style={shapeStyle}></div>;
            case 'losango':
                return <div className="shape-3-losango" style={shapeStyle}></div>;
            case 'circulo':
                return <div className="shape-3-circulo" style={shapeStyle}></div>;
            case 'retangulo':
                return <div className="shape-3-retangulo" style={shapeStyle}></div>;
            case 'paralelogramo':
                return <div className="shape-3-paralelogramo" style={shapeStyle}></div>;
            case 'elipse':
                return <div className="shape-3-elipse" style={shapeStyle}></div>;
            case 'pentagono-2':
                return <div className="shape-3-pentagono-2" style={shapeStyle}></div>;
            case 'retangulo-2':
                return <div className="shape-3-retangulo-2" style={shapeStyle}></div>;
            case 'oval':
                return <div className="shape-3-oval" style={shapeStyle}></div>;
            case 'paralelogramo-simples':
                return <div className="shape-3-paralelogramo-simples" style={shapeStyle}></div>;
            default:    
                return null;
        }
    };

    // Função que toca um som a partir de um arquivo de áudio
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    // Função que calcula a quantidade de estrelas que o jogador ganhará
    const calculateStars = (timeRemaining, totalTime, hintsUsed) => {
        let calculatedStars = 1;
        const percentageTimeLeft = (timeRemaining / totalTime) * 100;

        if (percentageTimeLeft >= 50) {
            calculatedStars = 2;
        }
        if (percentageTimeLeft >= 75 && hintsUsed === 0) {
            calculatedStars = 3;
        }

        return calculatedStars;
    };

    // Função para selecionar formas aleatórias sem repetições
    const selectRandomShapes = (source, count) => {
        if (source.length < count) {
            console.error("O array fornecido não tem elementos suficientes para a seleção.");
            return [];
        }
    
        const selected = [];
        const sourceCopy = [...source]; // Evita modificar o array original
        while (selected.length < count && sourceCopy.length > 0) {
            const index = Math.floor(Math.random() * sourceCopy.length);
            selected.push(sourceCopy.splice(index, 1)[0]);
        }
        return selected;
    };
    
    // Função para reiniciar o nível
    const restartLevel = () => { 
        setTimeRemaining(300 + (level - 1) * 30); // Ajusta o tempo baseado no nível
        setGameStatus('playing');
        setIsPaused(false);
        setSelectedShape(null);
        setStars(0);
        setHintsUsed(0);
        setSelectedCorrectShapes([]);
        setSelectedIncorrectShapes([]);
    
        // Garante que há formas suficientes para a escolha
        if (shapes.length < 6) {
            console.error("Não há formas suficientes para selecionar 4 formas corretas!");
            return;
        }

        // Seleciona 4 formas corretas aleatórias
        const randomCorrectShapes = selectRandomShapes(shapes, 8);
        setCorrectShapes(randomCorrectShapes);

        // Garante que há formas suficientes para ambos os lados (8 formas cada)
        const allShapes = [...new Set([...randomCorrectShapes, ...shapes])];
        while (allShapes.length < 20) {
            allShapes.push(...shapes);
            if (allShapes.length > 20) {
                allShapes.splice(20); // Garante exatamente 16 elementos
            }
        }
        
        // Embaralha e divide as formas para os lados
        const allShapesShuffled = shuffleShapes(allShapes); // Já ajustado para 16 elementos
        const shuffledLeftShapes = allShapesShuffled.slice(0, 10);
        const shuffledRightShapes = allShapesShuffled.slice(10, 20);
        
        setLeftShapes(shuffledLeftShapes);
        setRightShapes(shuffledRightShapes);
    };
    
    // Função que navega para o menu principal
    const goToMenu = () => {
        playSound(clickSound);
        navigate("/third-mode");
    };

    // Função que navega para o próximo nível
    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/third-mode-level/1');
    };

    // Função que formata o tempo em minutos e segundos
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Função chamada para pausar o jogo
    const handlePause = () => {
        playSound(clickSound);
        setIsPaused(true);
    };

    // Função chamada para continuar o jogo após a pausa
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função chamada ao selecionar uma forma
    const handleShapeSelection = (shape) => {
        setSelectedShape(shape);
        if (correctShapes.includes(shape)) {
            if (!selectedCorrectShapes.includes(shape)) {
                playSound(successSound);
                setSelectedCorrectShapes([...selectedCorrectShapes, shape]);

                // Se o jogador selecionar todas as formas corretas, ele vence
                if (selectedCorrectShapes.length + 1 === correctShapes.length) {
                    setGameStatus('won');  // Jogador vence ao encontrar todas as formas
                    const earnedStars = calculateStars(timeRemaining, 300, hintsUsed);
                    handleFinishLevel(earnedStars);
                }
            }
        } else {
            playSound(errorSound);
            if (!selectedIncorrectShapes.includes(shape)) {
                setSelectedIncorrectShapes([...selectedIncorrectShapes, shape]); // Adiciona a forma incorreta
            }
        }
    };

    // Função que renderiza o feedback das estrelas conquistadas
    const renderStars = () => {
        const totalStars = 3;
        const starsArray = [];

        for (let i = 0; i < totalStars; i++) {
            starsArray.push(
                <img
                    key={i}
                    src={i < stars ? starImage : starGrayImage}
                    alt="Estrela"
                    className="star-icon"
                />
            );
        }

        return <div className="star-feedback">{starsArray}</div>;
    };

    // Função chamada ao utilizar uma dica
    const handleHint = () => {
        playSound(clickSound); // Som de clique ao usar a dica

        if (hintsUsed < MAX_HINTS) {
            // Seleciona aleatoriamente uma das formas corretas
            const randomIndex = Math.floor(Math.random() * correctShapes.length);
            const randomShape = correctShapes[randomIndex];

            // Destaca a forma correta selecionada aleatoriamente
            setHighlightedShape(randomShape);

            // Incrementa o número de dicas usadas
            setHintsUsed(hintsUsed + 1);

            // Remove o destaque após 2 segundos
            setTimeout(() => setHighlightedShape(null), 2000);
        } else {
            // Exibe a mensagem de limite de dicas
            setShowHintLimitMessage(true);

            // Remove a mensagem após 3 segundos
            setTimeout(() => setShowHintLimitMessage(false), 3000);
        }
    };

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 5</h1>

            <div className="game-area-3">
                {/* Grade onde o jogador escolhe as formas geométricas */}
                <div className='item-grid-three'>

                    {/* Formas à esquerda */}
                    <div className="shapes-selection-1 left">
                        {leftShapes.slice(0, 10).map((shape, index) => (
                            <div
                                key={index}
                                className={`shape 
                                    ${selectedCorrectShapes.includes(shape) ? 'correct-border' : ''} 
                                    ${selectedIncorrectShapes.includes(shape) ? 'incorrect-border' : ''} 
                                    ${highlightedShape === shape ? 'correct-border' : ''}`} 
                                onClick={() => handleShapeSelection(shape)}
                            >
                                {renderShape(shape)}
                            </div>
                        ))}
                    </div>

                    {/* Imagem incompleta com o espaço faltando */}
                    <div className="incomplete-image-1">
                        <div className="square">
                            {/* Chama a função para renderizar as 4 formas na imagem incompleta */}
                            {renderMissingShapes()}
                        </div>
                    </div>

                    {/* Formas à direita */}
                    <div className="shapes-selection-1 right">
                        {rightShapes.slice(0, 10).map((shape, index) => (
                            <div
                                key={index}
                                className={`shape 
                                    ${selectedCorrectShapes.includes(shape) ? 'correct-border' : ''} 
                                    ${selectedIncorrectShapes.includes(shape) ? 'incorrect-border' : ''} 
                                    ${highlightedShape === shape ? 'correct-border' : ''}`} 
                                onClick={() => handleShapeSelection(shape)}
                            >
                                {renderShape(shape)}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="item-list">
                    <div className="status-one">
                        <p>Tempo restante:</p>
                        <p>{formatTime(timeRemaining)}</p>
                        <p>{selectedCorrectShapes.length}/{correctShapes.length}</p>
                    </div>
                </div>
            </div>

            {showHintLimitMessage && (
                <div className="hint-limit-message-overlay">
                    <div className="hint-limit-message">
                        <h2>Limite de Dicas Atingido!</h2>
                    </div>
                </div>
            )}

            <div className="controls-level-two">
                <button className="btn-control-two" onClick={handlePause}>||</button>
                <button className="btn-control-two" onClick={handleHint}>?</button>
            </div>

            {gameStatus !== 'playing' && (
                <div className="pause-overlay-one">
                    <div className="game-over-message-one">
                        {gameStatus === 'won' ? (
                            <>
                                {renderStars()}
                                <h2>PARABÉNS!</h2>
                                <p>Você completou a imagem a tempo.</p>
                            </>
                        ) : (
                            <>
                                <h2>QUE PENA!</h2>
                                <p>Você não completou a imagem a tempo.</p>
                            </>
                        )}
                        <button onClick={goToMenu}>Menu</button>
                        <button onClick={goToNextLevel}>Próximo</button>
                        <button onClick={restartLevel}>Reiniciar</button>
                    </div>
                </div>
            )}

            {isPaused && (
                <div className="pause-overlay-one">
                    <div className="pause-message-one">
                        <h2>Jogo Pausado</h2>
                        <button onClick={handleContinue}>Continuar</button>
                        <button onClick={goToMenu}>Desistir</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiveLevel;