import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3'; // Som para cliques
import successSound from '../../../../assets/sounds/success.mp3'; // Som para um acerto
import starImage from '../../../../assets/stars/star.png'; // Imagem da estrela colorida
import starGrayImage from '../../../../assets/stars/star-gray.png'; // Imagem da estrela cinza
import backgroundImage from '../../../../assets/background_levels/SecondModeFive_Six.png'; // Imagem de fundo do nível
import './SixLevel.css'; // Arquivo de estilos do nível

const SixLevel = () => {
    const navigate = useNavigate(); // Hook para navegação entre páginas
    
    // Estado do nível, inicializado com 1
    const [level, setLevel] = useState(1);

    const todasPalavras = [ 
        '1234ABCD90', '2345EFGH01', '3456IJKL12', '4567MNOP23', '5678QRST34', '6789UVWX45', '7890YZAB56', 
        '8901CDEF67', '9012GHIJ78', '0123JKLM89', '1357NOPQ01', '2468RSTU12', '3579VWXY23', '4680ZABC34', 
        '5791DEFG45', '6802HIJK56', '7913LMNO67', '8024PQRS78', '9135TUVW89', '0246XYZA90', '1358BCDE12', 
        '2469FGHI34', '3570JKLM56', '4681NOPQ78', '5792RSTU90', '6803VWXY12', '7914ZABC34', '8025DEFG56', 
        '9136HIJK78', '0247LMNO90', '1357PQRS90', '2468TUVW01', '3579XYZA12', '4680BCDE23', '5791FGHI34',
        '6802JKLM45', '7913NOPQ56', '8024RSTU67', '9135VWXY78', '0246ZABC89', '1358DEFG01', '2469HIJK23', 
        '3570LMNO34', '4681PQRS45', '5792TUVW56', '6803XYZA67', '7914BCDE78', '8025FGHI89', '9136JKLM90', 
        '0247NOPQ12', '1359RSTU34', '2460VWXY45', '3571ZABC56', '4682DEFG67', '5793HIJK78', '6804LMNO89', 
        '7915PQRS90', '8026TUVW12', '9137XYZA34', '0248BCDE56' ];

    const [palavras, setPalavras] = useState([]); // Lista de palavras selecionadas para o nível
    const [indicePalavraAtual, setIndicePalavraAtual] = useState(0); // Índice da palavra que o jogador está digitando
    const [textoDigitado, setTextoDigitado] = useState(''); // Texto digitado pelo jogador
    const [palavrasDigitadas, setPalavrasDigitadas] = useState([]); // Palavras já digitadas corretamente
    const [timeRemaining, setTimeRemaining] = useState(180); // Tempo restante do nível, em segundos
    const [gameStatus, setGameStatus] = useState('playing'); // Status do jogo (e.g., jogando, pausado, finalizado)
    const [isPaused, setIsPaused] = useState(false); // Indica se o jogo está pausado
    const [hintPalavra, setHintPalavra] = useState(null); // Palavra ou informação de dica ativa
    const [stars, setStars] = useState(0); // Estrelas conquistadas no nível atual
    const [highlightedSquares, setHighlightedSquares] = useState([]); // Quadrados destacados (usados para mostrar dicas)
    const [hintIndex, setHintIndex] = useState(0); // Índice da dica ativa
    const [cursorPosition, setCursorPosition] = useState(0); // Posição do cursor no campo de entrada
    const [isWordsVisible, setIsWordsVisible] = useState(true); // Nova variável de estado
    const [hintsUsed, setHintsUsed] = useState(0); // Número de dicas usadas
    const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Controle da exibição da mensagem de limite
    const [totalStars, setTotalStars] = useState(0); // Total de estrelas acumuladas ao longo do jogo

    const MAX_HINTS = 10 + level - 1; // Número máximo de dicas permitidas

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

    // Função que roda ao montar o componente para atualizar totalStars e o nível
    useEffect(() => {
        const starsFromStorage = getTotalStars();
        const currentLevel = calculateLevel(starsFromStorage);
        setLevel(currentLevel);
        setTimeRemaining(180 + (currentLevel - 1) * 30); // Ajusta o tempo inicial baseado no nível
    }, []);
    
    // Função que finaliza o nível e atualiza o progresso do jogador
    const handleFinishLevel = (earnedStars) => {
        addStars(earnedStars);
        const updatedStars = getTotalStars();
        setLevel(calculateLevel(updatedStars)); // Atualiza o nível após concluir o nível
    };

    // Função para selecionar palavras aleatórias para o nível
    const selecionarPalavrasAleatorias = () => {
        const palavrasSelecionadas = [];

        // Enquanto houver menos de 4 palavras selecionadas, continua escolhendo
        while (palavrasSelecionadas.length < 8) {
        const indexAleatorio = Math.floor(Math.random() * todasPalavras.length);
        const palavraSelecionada = todasPalavras[indexAleatorio];

        // Evita adicionar palavras duplicadas
        if (!palavrasSelecionadas.includes(palavraSelecionada)) {
            palavrasSelecionadas.push(palavraSelecionada);
        }
        }

        setPalavras(palavrasSelecionadas);
    };

    // useEffect para selecionar palavras aleatórias ao montar o componente
    useEffect(() => {
        selecionarPalavrasAleatorias(); // Seleciona novas palavras aleatórias ao iniciar o componente
    }, []);

    // useEffect para focar no campo de entrada sempre que o texto digitado ou o status de pausa mudar
    useEffect(() => {
        const inputField = document.querySelector('.hidden-input');
        if (inputField && !isPaused) {
        inputField.focus();
        inputField.setSelectionRange(textoDigitado.length, textoDigitado.length); // Coloca o cursor no final
        }
    }, [textoDigitado, isPaused]);

    // Atualiza a posição do cursor com base no texto digitado
    useEffect(() => {
        // Atualiza a posição do cursor
        setCursorPosition(textoDigitado.length);
    }, [textoDigitado]);
    
    // Controla o temporizador do jogo
    useEffect(() => {
        if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
        } else if (timeRemaining === 0 && gameStatus === 'playing') {
        setGameStatus('lost');
        }
    }, [timeRemaining, gameStatus, isPaused]);

    useEffect(() => {
        if (gameStatus === 'playing' && !isPaused) {
        const visibilityTimer = setInterval(() => {
            setIsWordsVisible((prev) => !prev); // Alterna a visibilidade
        }, 20000); // 30 segundos
    
        // Timer para voltar a visibilidade após 5 segundos
        const returnTimer = setTimeout(() => {
            setIsWordsVisible(true); // Garante que a lista de palavras volte
        }, 5000); // 30 segundos + 5 segundos
    
        return () => {
            clearInterval(visibilityTimer);
            clearTimeout(returnTimer);
        };
        }
    }, [gameStatus, isPaused]);  

    // Verifica se o texto digitado corresponde a uma palavra válida
    useEffect(() => {
        if (textoDigitado.length ===10) {
        const palavraAtual = palavras.find((p) => p === textoDigitado.toUpperCase());
        if (palavraAtual) {
            setPalavrasDigitadas([...palavrasDigitadas, palavraAtual]);
            setHighlightedSquares((prev) => [...prev, palavraAtual]); // Atualizando a lista de palavras destacadas
            playSuccessSound();
    
            setHintIndex(0);
    
            if (palavrasDigitadas.length + 1 === palavras.length) {
            const earnedStars = calculateStars(timeRemaining, 180, hintsUsed); // Passando parâmetros corretos
            handleFinishLevel(earnedStars); // Salvando estrelas
            setGameStatus('won');
            }
            setTextoDigitado(''); // Limpar o campo de texto após acertar
        } else {
            setTextoDigitado(''); // Limpa o texto se a palavra estiver incorreta
        }
        }
    }, [textoDigitado, palavrasDigitadas]); // Remover highlightedSquares do array de dependências
    
    // Função para tocar um som
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    // Função para tocar o som quando e feito um acerto
    const playSuccessSound = () => {
        playSound(successSound);
    };

    // Calcula as Estrelas 
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

    // Função que foca no campo de entrada quando um quadrado é clicado
    const handleClickOnSquare = () => {
        document.querySelector('.hidden-input').focus();
    };

    // Função para reiniciar o nível
    const restartLevel = () => {
        setIndicePalavraAtual(0);
        setPalavrasDigitadas([]);
        setTimeRemaining(180 + (level - 1) * 30); // Ajusta o tempo baseado no nível
        setGameStatus('playing');
        setIsPaused(false);
        setHintPalavra(null);
        setStars(0);
        setHighlightedSquares([]);
        setTextoDigitado('');
        setHintIndex(0);
        selecionarPalavrasAleatorias();
        setIsWordsVisible(true); // Resetar visibilidade da lista
        setHintsUsed(0); // Reseta o número de dicas usadas
        // Focar no campo de entrada após reiniciar
        setTimeout(() => {
        document.querySelector('.hidden-input').focus();
        }, 0); // Use um timeout de 0 para garantir que isso ocorra após o estado ser atualizado
    };    

    // Função para ir ao menu principal
    const goToMenu = () => {
        playSound(clickSound);
        navigate('/second-mode');
    };

    // Função para avançar para o próximo nível
    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/second-mode-level/7');
    };

    // Formatação do tempo restante no formato MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Função para pausar o jogo
    const handlePause = () => {
        playSound(clickSound);
        setIsPaused(true);
    };

    // Função para continuar o jogo após a pausa
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função para exibir uma dica
    const handleHint = () => {
        playSound(clickSound);

        if (hintsUsed < MAX_HINTS) {
            let palavraEmProgresso = palavras.find(
                (p) => p.startsWith(textoDigitado) && !palavrasDigitadas.includes(p)
            );

            if (!palavraEmProgresso) {
                palavraEmProgresso = palavras.find((p) => !palavrasDigitadas.includes(p));
                setTextoDigitado('');
            }

            if (palavraEmProgresso) {
                const letrasRestantes = palavraEmProgresso.slice(textoDigitado.length);
                if (letrasRestantes.length > 0) {
                    const novaLetra = letrasRestantes[0];
                    setTextoDigitado((prevTexto) => prevTexto + novaLetra);
                    setHintsUsed(hintsUsed + 1); // Incrementa o número de dicas usadas
                    setTimeout(() => setHintPalavra(null), 3000);
                }
            }
        } else {
            // Exibe a mensagem de limite de dicas atingido
            setShowHintLimitMessage(true);
            setTimeout(() => {
                setShowHintLimitMessage(false); // Remove a mensagem após 3 segundos
                // Foca no campo de entrada após exibir a mensagem
                document.querySelector('.hidden-input').focus();
            }, 3000);
        }
    };

    // Função para renderizar as estrelas baseadas no desempenho do jogador
    const renderStars = () => {
        const totalStars = 3;
        const starsArray = [];

        for (let i = 0; i < totalStars; i++) {
        starsArray.push(
            <img key={i} src={i < stars ? starImage : starGrayImage} alt="Estrela" className="star-icon" />
        );
        }

        return <div className="star-feedback">{starsArray}</div>;
    };

    // Função que lida com alterações no campo de entrada
    const handleInputChange = (e) => {
        setTextoDigitado(e.target.value.toUpperCase());
        setCursorPosition(e.target.value.length); // Atualiza a posição do cursor
    };

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1>NÍVEL 6</h1>
    
        <div className="game-area">
            <div className="typing-area">
            <div className="input-grid-6" onClick={handleClickOnSquare}>
                {Array(10).fill('').map((_, index) => (
                <React.Fragment key={index}>
                    <div className="input-square">
                    {textoDigitado[index] || ''}
                    {index === cursorPosition && <span className="cursor" />}
                    </div>
                    {/* Exibir o traço entre o quarto e o quinto quadrado */}
                    {index === 4 && <span className="dash-6">-</span>}
                </React.Fragment>
                ))}
            </div>
    
            <input
                type="text"
                className="hidden-input"
                value={textoDigitado}
                onChange={handleInputChange}
                maxLength={10}
                autoComplete="off"
                disabled={isPaused}
            />
    
            {highlightedSquares.length > 0 && (
                <div className="correto-grid">
                {highlightedSquares.map((palavra, index) => (
                    <div key={index} className="correct">
                    {palavra.split('').map((letra, letraIndex) => (
                        <span key={letraIndex}>{letra}</span>
                    ))}
                    </div>
                ))}
                </div>
            )}

            {hintPalavra && <p className="hint-text">Dica: {hintPalavra}</p>}
            </div>
    
            <div className="item-list">
            <div className="status">
                <p>Tempo Limite: {formatTime(timeRemaining)}</p>
                <p>Palavras digitadas: {palavrasDigitadas.length}/{palavras.length} </p>
                <p>Digite os codigos listado abaixo.</p>
            </div>
    
            {/* Lista de palavras com controle de visibilidade */}
            <ul className={`palavras-list ${isPaused || !isWordsVisible ? 'hidden' : ''}`}>
                {palavras.map((palavra, index) => (
                <li key={index} className={palavrasDigitadas.includes(palavra) ? 'found-one' : ''}>
                    {palavra.slice(0, 5) + '-' + palavra.slice(5)} {/* Adiciona o traço */}
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
    
        <div className="controls-second">
            <button className="second-btn-control" onClick={handlePause}>||</button>
            <button className="second-btn-control" onClick={handleHint}>?</button>
        </div>
    
        {gameStatus !== 'playing' && (
            <div className="pause-overlay-two">
            <div className="game-over-message-two">
                {gameStatus === 'won' ? (
                <>
                    {renderStars()}
                    <h2>PARABÉNS!</h2>
                    <p>Você digitou todas os códigos corretamente.</p>
                </>
                ) : (
                <>
                    <h2>QUE PENA!</h2>
                    <p>Você não conseguiu digitar todas os códigos a tempo.</p>
                </>
                )}
                <button onClick={goToMenu}>Menu</button>
                <button onClick={goToNextLevel}>Próximo</button>
                <button onClick={restartLevel}>Reiniciar</button>
            </div>
            </div>
        )}
    
        {isPaused && (
            <div className="pause-overlay-two">
            <div className="pause-message-two">
                <h2>Jogo Pausado</h2>
                <button onClick={handleContinue}>Continuar</button>
                <button onClick={goToMenu}>Desistir</button>
            </div>
            </div>
        )}
        </div>
    );
  
};

export default SixLevel;
