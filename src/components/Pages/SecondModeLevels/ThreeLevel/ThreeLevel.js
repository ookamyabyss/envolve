import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/SecondModeThree_Four.png';
import './ThreeLevel.css';

const ThreeLevel = () => {
  const navigate = useNavigate();
  const todasPalavras = [
    'FANTASIA', 'CACHORRO', 'ABACATES', 'FRUTINHA', 'SARDINHA', 'CAMPANHA', 'DISPONHA', 'AMISTOSO', 
    'ARTEFATO', 'MONTANHA', 'ACIDENTE', 'TRADUZIR', 'PENDENTE', 'PADRINHO', 'RELOGIOS', 'RESPEITO',
    'OBJETIVO', 'OTIMISTA', 'IMINENTE', 'INFERIOR', 'LIMITADA', 'LEALDADE', 'MATUTINO', 'ELEGANTE', 
    'ESCASSEZ', 'ENCANTOS', 'COMPOSTO', 'OFICINAS', 'CAPRICHO', 'CANTINHO', 'PADRINHO', 'CADERNOS',
    'PARAFUSO', 'LANCHERA', 'TORNEIRA', 'CONDUTOR', 'ESPECIAL', 'PROJETOS', 'DERIVADO', 'ESPINHOS',
    'INTERIOR', 'SURPRESA', 'CONSERTO', 'PALAVRAS', 'ROTEIROS', 'RECEITAS', 'MAQUINAS', 'TECLADOS' ];
  
  const [palavras, setPalavras] = useState([]); // Corrigido: estado para as palavras selecionadas
  const [indicePalavraAtual, setIndicePalavraAtual] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [palavrasDigitadas, setPalavrasDigitadas] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [hintPalavra, setHintPalavra] = useState(null);
  const [stars, setStars] = useState(0);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0); // Número de dicas usadas
  const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Controle da exibição da mensagem de limite
  const MAX_HINTS = 15; // Número máximo de dicas permitidas

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

  //-----------

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

  useEffect(() => {
    selecionarPalavrasAleatorias(); // Seleciona novas palavras aleatórias ao iniciar o componente
  }, []);

  useEffect(() => {
    const inputField = document.querySelector('.hidden-input');
    if (inputField && !isPaused) {
      inputField.focus();
      inputField.setSelectionRange(textoDigitado.length, textoDigitado.length); // Coloca o cursor no final
    }
  }, [textoDigitado, isPaused]);

  useEffect(() => {
    // Atualiza a posição do cursor
    setCursorPosition(textoDigitado.length);
  }, [textoDigitado]);
  
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
    if (textoDigitado.length === 8) {
      const palavraAtual = palavras.find((p) => p === textoDigitado.toUpperCase());
      if (palavraAtual) {
        setPalavrasDigitadas([...palavrasDigitadas, textoDigitado]);
        setHighlightedSquares([...highlightedSquares, textoDigitado]);
        playSuccessSound();

        setHintIndex(0);

        if (palavrasDigitadas.length + 1 === palavras.length) {
          const earnedStars = calculateStars(timeRemaining, 180, hintsUsed); // Passando parâmetros corretos
          handleFinishLevel(earnedStars); // Salvando estrelas
          setGameStatus('won');
        }
       
        setTextoDigitado('');
      } else {
        setTextoDigitado('');
      }
    }
  }, [textoDigitado, palavrasDigitadas, highlightedSquares]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const playSuccessSound = () => {
    playSound(successSound);
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

  const handleClickOnSquare = () => {
    document.querySelector('.hidden-input').focus();
  };

  const restartLevel = () => {
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(180);
    setGameStatus('playing');
    setIsPaused(false);
    setHintPalavra(null);
    setStars(0);
    setHighlightedSquares([]);
    setTextoDigitado('');
    setHintIndex(0);
    selecionarPalavrasAleatorias();
    setHintsUsed(0); // Reseta o número de dicas usadas
    // Focar no campo de entrada após reiniciar
    setTimeout(() => {
      document.querySelector('.hidden-input').focus();
    }, 0); // Use um timeout de 0 para garantir que isso ocorra após o estado ser atualizado
  };

  const goToMenu = () => {
    playSound(clickSound);
    navigate('/second-mode');
  };

  const goToNextLevel = () => {
    playSound(clickSound);
    navigate('/second-mode-level/4');
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

  const handleInputChange = (e) => {
    setTextoDigitado(e.target.value.toUpperCase());
    setCursorPosition(e.target.value.length); // Atualiza a posição do cursor
  };

  return (
    <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>NÍVEL 3</h1>

      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid-3" onClick={handleClickOnSquare}>
            {Array(8).fill('').map((_, index) => (
              <div key={index} className="input-square">
                {textoDigitado[index] || ''}
                {index === cursorPosition && <span className="cursor" />}
              </div>
            ))}
          </div>

          <input
            type="text"
            className="hidden-input"
            value={textoDigitado}
            onChange={handleInputChange}
            autoFocus
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
            <p>Digite as palavras listada abaixo.</p>
          </div>

          {/* Aplique a classe hidden-TWO diretamente no contêiner da lista de palavras */}
          <ul className={`palavras-list ${isPaused ? 'hidden' : ''}`}>
            {palavras.map((palavra, index) => (
              <li
                key={index}
                className={`${
                  palavrasDigitadas.includes(palavra) ? 'found-one' : ''
                } ${palavra === hintPalavra ? 'highlight' : ''}`}
              >
                {palavra}
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
                <p>Você digitou todas as palavras corretamente.</p>
              </>
            ) : (
              <>
                <h2>QUE PENA!</h2>
                <p>Você não conseguiu digitar todas as palavras a tempo.</p>
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

export default ThreeLevel;