import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import itemFoundSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/FirstModeSeven_Eight.jpg'; // Background para a fase 7
import lockIcon from '../../../../assets/icons/lock.png'; // Ícone de cadeado
import './SevenLevel.css';

const SevenLevel = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [itemsToFind, setItemsToFind] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [lockedItems, setLockedItems] = useState([]); // Itens bloqueados
    const [timeRemaining, setTimeRemaining] = useState(480);
    const [gameStatus, setGameStatus] = useState('playing');
    const [isPaused, setIsPaused] = useState(false);
    const [hintItem, setHintItem] = useState(null);
    const [stars, setStars] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0); // Usar estado para controlar as dicas
    const MAX_HINTS = 2; // Número máximo de dicas permitidas
    const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Estado para controlar a exibição da mensagem de limite

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
    };

    const handleFinishLevel = (earnedStars) => {
        // Atualiza o total de estrelas no sessionStorage
        addStars(earnedStars);
        // Definir outras ações, como navegação para próxima fase ou exibir mensagem de vitória
    };

    // Função para carregar as imagens dos itens
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''),
            image: r(fileName)
        }));
    };

    const allItems = importAll(require.context('../../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // Inicializa o jogo embaralhando os itens e criando a lista de itens a serem encontrados
        const initializeGame = () => { 
            const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
            setItems(shuffledItems);
        
            // Selecionar 10 itens aleatórios para serem encontrados
            const itemsToFindSet = new Set();
            while (itemsToFindSet.size < 10) {
                itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
            }
            const itemsToFindArray = Array.from(itemsToFindSet);
            setItemsToFind(itemsToFindArray);
        
            // Selecionar 15 itens bloqueados aleatoriamente
            const lockedItemsSet = new Set();
            while (lockedItemsSet.size < 15) { // Define quantos itens serão bloqueados
                const randomItem = shuffledItems[Math.floor(Math.random() * shuffledItems.length)];
                lockedItemsSet.add(randomItem);
            }
        
            // Verificar se todos os itens a serem encontrados estão bloqueados
            const allFoundItemsBlocked = itemsToFindArray.every(item => lockedItemsSet.has(item));
        
            // Se todos os itens a serem encontrados estão bloqueados, desbloquear pelo menos 1
            if (allFoundItemsBlocked) {
                // Desbloquear um item encontrado, removendo-o da lista de bloqueados
                lockedItemsSet.delete(itemsToFindArray[0]); // Desbloqueia o primeiro item
            }
        
            setLockedItems(Array.from(lockedItemsSet)); // Armazena os itens bloqueados
        };
        initializeGame();
    }, []);

    useEffect(() => {
        // Controla o temporizador do jogo
        if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setGameStatus('lost');
        }
    }, [timeRemaining, gameStatus, isPaused]);

    const handleItemClick = (item) => { 
        if (lockedItems.includes(item)) {
            return; // Não permite clicar em itens bloqueados
        }
    
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);
            playItemFoundSound();
    
            // Desbloquear itens à medida que o jogador encontra outros
            const numItemsToUnlock = 3; // Quantidade de itens a desbloquear de cada vez
            if (lockedItems.length > 0) {
                const newLockedItems = lockedItems.slice(numItemsToUnlock); // Remove os itens desbloqueados da lista
                setLockedItems(newLockedItems); // Atualiza o estado com os itens restantes bloqueados
            }
    
            // Verifica se todos os itens foram encontrados
            if (foundItems.length + 1 === itemsToFind.length) {
                const earnedStars = calculateStars(timeRemaining, 480, hintsUsed); // Calcula as estrelas
                setStars(earnedStars); // Atualiza o número de estrelas no estado
                setGameStatus('won'); // Define o status do jogo como "vencido"
                handleFinishLevel(earnedStars); // Adiciona as estrelas ao sessionStorage
            }
            
        }
    };    
    
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const playItemFoundSound = () => {
        playSound(itemFoundSound);
    };

    const calculateStars = (timeRemaining, totalTime, hintsUsed) => {
        let calculatedStars = 1; // O jogador sempre começa com 1 estrela
        const percentageTimeLeft = (timeRemaining / totalTime) * 100;
    
        if (percentageTimeLeft >= 50) {
            calculatedStars = 2; // Se restar 50% ou mais do tempo, ganha 2 estrelas
        }
        if (percentageTimeLeft >= 75 && hintsUsed === 0) {
            calculatedStars = 3; // Se restar 75% ou mais do tempo e não usou dicas, ganha 3 estrelas
        }
    
        setStars(calculatedStars); // Atualiza o estado com o número de estrelas
        return calculatedStars; // Retorna o número de estrelas calculadas
    };  

    const restartLevel = () => {
        // Reinicia o jogo mantendo o estado original
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);
    
        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));
    
        setFoundItems([]);
        setTimeRemaining(480);
        setGameStatus('playing');
        setIsPaused(false);
        setHintItem(null);
        setStars(0);
        setHintsUsed(0); // Reseta o número de dicas usadas
        // Seleciona 30% dos itens de forma aleatória para bloqueá-los
        const numLockedItems = Math.floor(shuffledItems.length * 0.3);
        const lockedItemsSet = new Set();
        while (lockedItemsSet.size < numLockedItems) {
            const randomItem = shuffledItems[Math.floor(Math.random() * shuffledItems.length)];
            lockedItemsSet.add(randomItem);
        }
        setLockedItems(Array.from(lockedItemsSet));
    };
    
    const goToMenu = () => {
        playSound(clickSound);
        navigate("/first-mode");
    };

    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/first-mode-level/8');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handlePause = () => {
        playSound(clickSound);
        setIsPaused(true);
    };
  
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função para exibir uma dica
    const handleHint = () => {
        playSound(clickSound);

        if (hintsUsed < MAX_HINTS && itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setHintsUsed(hintsUsed + 1);  // Atualiza o estado com uma nova dica usada
            // Remove a dica após 3 segundos
            setTimeout(() => setHintItem(null), 2000);
        } else {
            // Exibe a mensagem de limite de dicas
            setShowHintLimitMessage(true);

            // Remove a mensagem após 3 segundos
            setTimeout(() => setShowHintLimitMessage(false), 3000);
        }
    };

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

    return (
        <div className={`level-container ${isPaused ? 'paused' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 7</h1>
        
            <div className="game-area">
                {/* A classe paused é adicionada aqui para tornar a grade invisível */}
                <div className={`item-grid ${isPaused ? 'paused' : ''}`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found-one' : ''} ${hintItem === item ? 'hint' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {lockedItems.includes(item) && (
                                <img src={lockIcon} alt="Cadeado" className="lock-icon" />
                            )}
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>
        
                <div className="item-list">
                    <div className="status">
                        <p>{formatTime(timeRemaining)}</p>
                        <p>Itens encontrados: </p>
                        <p>{foundItems.length}/{itemsToFind.length}</p>
                    </div>
                    <ul>
                        {itemsToFind.map((item, index) => (
                            <li key={index} className={foundItems.includes(item) ? 'found-one' : ''}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>

            {showHintLimitMessage && (
                <div className="hint-limit-message-overlay">
                    <div className="hint-limit-message">
                        <h2>Limite de Dicas Atingido!</h2>
                    </div>
                </div>
            )}           
        
            {/* Controles do jogo */}
            <div className="controls-level-one">
                <button className="btn-control-one" onClick={handlePause}>||</button>
                <button className="btn-control-one" onClick={handleHint}>?</button>
            </div>

            {/* Tela de Game Over ou vitória */}
            {gameStatus !== 'playing' && (
                <div className="pause-overlay-one">
                    <div className="game-over-message-one">
                        {gameStatus === 'won' ? (
                            <>
                                {renderStars()} {/* Exibe estrelas coloridas e cinzas */}
                                <h2>PARABÉNS!</h2>
                                <p>Você encontrou todos os itens.</p>
                            </>
                        ) : (
                            <>
                                <h2>QUE PENA!</h2>
                                <p>Você não encontrou todos os itens.</p>
                            </>
                        )}
                        <button onClick={goToMenu}>Menu</button>
                        <button onClick={goToNextLevel}>Próximo</button>
                        <button onClick={restartLevel}>Reiniciar</button>
                    </div>
                </div>
            )}

            {/* Tela de pausa */}
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

export default SevenLevel;