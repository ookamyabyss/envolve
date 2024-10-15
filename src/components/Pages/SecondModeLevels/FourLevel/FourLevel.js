import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/SecondModeThree_Four.png';
import './FourLevel.css';

const FourLevel = () => {
  const navigate = useNavigate();
  const todasPalavras = [
    '1234ABCD', '5678EFGH', '9101IJKL', '2345MNOP', '6789QRST', '3456UVWX', '7890YZAB', '0123CDEF', 
    '4567GHIJ', '8910KLMN', '1357OPQR', '2468STUV', '3579WXYZ', '4680ABCD', '5791EFGH', '6802IJKL', 
    '7913MNOP', '8024QRST', '9135UVWX', '0246YZAB', '1358CDEF', '2469GHIJ', '3570KLMN', '4681OPQR', 
    '5792STUV', '6803WXYZ', '7914ABCD', '8025EFGH', '9136IJKL', '0247MNOP', '1359QRST', '1350GHIJ',
    '2468UVWX', '3579YZAB', '4680CDEF', '5791GHIJ', '6802KLMN', '7913OPQR', '8024STUV', '9135WXYZ', 
    '0246ABCD', '1357EFGH', '2469IJKL', '3570MNOP', '4681QRST', '5792UVWX', '6803YZAB', '7914CDEF', 
    '8025GHIJ', '9136KLMN', '0247OPQR', '1359STUV', '2460WXYZ', '3571ABCD', '4682EFGH', '5793IJKL', 
    '6804MNOP', '7915QRST', '8026UVWX', '9137YZAB', '0248CDEF', ];

  const [palavras, setPalavras] = useState([]); // Corrigido: estado para as palavras selecionadas
  const [indicePalavraAtual, setIndicePalavraAtual] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [palavrasDigitadas, setPalavrasDigitadas] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [hintPalavra, setHintPalavra] = useState(null);
  const [stars, setStars] = useState(0);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isWordsVisible, setIsWordsVisible] = useState(true); // Nova variável de estado
  const [hintsUsed, setHintsUsed] = useState(0); // Número de dicas usadas
  const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Controle da exibição da mensagem de limite
  const MAX_HINTS = 10; // Número máximo de dicas permitidas

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
    while (palavrasSelecionadas.length < 4) {
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

  useEffect(() => {
    if (textoDigitado.length === 8) {
      const palavraAtual = palavras.find((p) => p === textoDigitado.toUpperCase());
      if (palavraAtual) {
        setPalavrasDigitadas([...palavrasDigitadas, palavraAtual]);
        setHighlightedSquares((prev) => [...prev, palavraAtual]); // Atualizando a lista de palavras destacadas
        playSuccessSound();
  
        setHintIndex(0);
  
        if (palavrasDigitadas.length + 1 === palavras.length) {
          const earnedStars = calculateStars(timeRemaining, 300, hintsUsed); // Passando parâmetros corretos
          handleFinishLevel(earnedStars); // Salvando estrelas
          setGameStatus('won');
        }
        setTextoDigitado(''); // Limpar o campo de texto após acertar
      } else {
        setTextoDigitado(''); // Limpa o texto se a palavra estiver incorreta
      }
    }
  }, [textoDigitado, palavrasDigitadas]); // Remover highlightedSquares do array de dependências
  
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

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

  const handleClickOnSquare = () => {
    document.querySelector('.hidden-input').focus();
  };

  const restartLevel = () => {
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(300);
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

  const goToMenu = () => {
    playSound(clickSound);
    navigate('/second-mode');
  };

  const goToNextLevel = () => {
    playSound(clickSound);
    navigate('/second-mode-level/5');
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
      <h1>NÍVEL 4</h1>
  
      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid-4" onClick={handleClickOnSquare}>
            {Array(8).fill('').map((_, index) => (
              <React.Fragment key={index}>
                <div className="input-square">
                  {textoDigitado[index] || ''}
                  {index === cursorPosition && <span className="cursor" />}
                </div>
                {/* Exibir o traço entre o quarto e o quinto quadrado */}
                {index === 3 && <span className="dash">-</span>}
              </React.Fragment>
            ))}
          </div>
  
          <input
            type="text"
            className="hidden-input"
            value={textoDigitado}
            onChange={handleInputChange}
            maxLength={8}
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
            <p>{formatTime(timeRemaining)}</p>
            <p>Palavras digitadas:</p>
            <p>{palavrasDigitadas.length}/{palavras.length}</p>
          </div>
  
          {/* Lista de palavras com controle de visibilidade */}
          <ul className={`palavras-list ${isPaused || !isWordsVisible ? 'hidden' : ''}`}>
            {palavras.map((palavra, index) => (
              <li key={index} className={palavrasDigitadas.includes(palavra) ? 'found-one' : ''}>
                {palavra.slice(0, 4) + '-' + palavra.slice(4)} {/* Adiciona o traço */}
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

export default FourLevel;