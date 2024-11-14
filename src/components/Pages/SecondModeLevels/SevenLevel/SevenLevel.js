import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/SecondModeSeven_Eight.png';
import './SevenLevel.css';

const SevenLevel = () => {
  const navigate = useNavigate();
  const todasPalavras = [ 
    '1234ABCD', '2345EFGH', '3456IJKL', '67MNOP23', '78QRST34', '6789UVWX', '7890YZAB', '8901CDEF', 
    '12GHIJ78', '23JKLM89', '1357NOPQ', '2468RSTU', '3579VWXY', '80ZABC34', '91DEFG45', '6802HIJK', 
    '7913LMNO', '8024PQRS', '35TUVW89', '46XYZA90', '1358BCDE', '2469FGHI', '3570JKLM', '81NOPQ78', 
    '92RSTU90', '6803VWXY', '7914ZABC', '8025DEFG', '36HIJK78', '47LMNO90', '57NOPQ12', '68RSTU34', 
    '79VWXY45', '80ZABC56', '91DEFG67', '12HIJK89', '23LMNO90', '34PQRS12', '45TUVW34', '56XYZA45', 
    '67BCDE56', '78FGHI67', '89JKLM78', '90NOPQ89', '12RSTU90', '34VWXY01', '46ZABC23', '57DEFG34', 
    '68HIJK45', '79LMNO56', '80PQRS67', '91TUVW78', '02XYZA90', '13BCDE01', '24FGHI12', '35JKLM23', 
    '46NOPQ34', '57RSTU45', '68VWXY56', '79ZABC67' ];

  const [palavras, setPalavras] = useState([]);
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
  const [palavrasOcultadas, setPalavrasOcultadas] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0); // Número de dicas usadas
  const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Controle da exibição da mensagem de limite

  const [totalStars, setTotalStars] = useState(0);
  const [level, setLevel] = useState(1);
  const MAX_HINTS = 8 + level - 1; // Número máximo de dicas permitidas

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
    setTotalStars(starsFromStorage);
    setLevel(calculateLevel(starsFromStorage)); // Calcula o nível inicial
  }, []);

  const handleFinishLevel = (earnedStars) => {
    addStars(earnedStars);
    const updatedStars = getTotalStars();
    setLevel(calculateLevel(updatedStars)); // Atualiza o nível após concluir o nível
  };

  //-----------

  const selecionarPalavrasAleatorias = () => {
    const palavrasSelecionadas = [];
    while (palavrasSelecionadas.length < 4) {
      const indexAleatorio = Math.floor(Math.random() * todasPalavras.length);
      const palavraSelecionada = todasPalavras[indexAleatorio];
      if (!palavrasSelecionadas.includes(palavraSelecionada)) {
        palavrasSelecionadas.push(palavraSelecionada);
      }
    }
    setPalavras(palavrasSelecionadas);
    setPalavrasOcultadas(palavrasSelecionadas); // Inicialmente exibe as palavras
  };

  useEffect(() => {
    selecionarPalavrasAleatorias();
  }, []);

  useEffect(() => {
    const ocultarTresLetrasAleatorias = (palavrasAtuais) => {
      const palavrasOcultadas = palavrasAtuais.map((palavra) => {
        let indicesAleatorios = [];
        while (indicesAleatorios.length < 3) {
          const indexAleatorio = Math.floor(Math.random() * palavra.length);
          if (!indicesAleatorios.includes(indexAleatorio)) {
            indicesAleatorios.push(indexAleatorio);
          }
        }
        let palavraComOcultacoes = palavra.split('');
        indicesAleatorios.forEach((index) => {
          palavraComOcultacoes[index] = '*';
        });
        return palavraComOcultacoes.join('');
      });
      setPalavrasOcultadas(palavrasOcultadas);
    };
  
    // Captura as palavras selecionadas inicialmente e oculta letras
    const palavrasSelecionadas = [...palavras]; // Clona as palavras atuais para garantir que sejam mantidas as mesmas
    const primeiroTimeout = setTimeout(() => {
      ocultarTresLetrasAleatorias(palavrasSelecionadas);
    }, 20000); // Oculta após 20 segundos
  
    const intervalo = setInterval(() => {
      ocultarTresLetrasAleatorias(palavrasSelecionadas); // Usa as palavras selecionadas inicialmente
    }, 20000); // Continua ocultando a cada 20 segundos
  
    // Limpa os timers ao desmontar o componente
    return () => {
      clearTimeout(primeiroTimeout);
      clearInterval(intervalo);
    };
  }, [palavras]); 
  
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
          const earnedStars = calculateStars(timeRemaining, 300, hintsUsed); // Passando parâmetros corretos
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
    selecionarPalavrasAleatorias(); // Seleciona novas palavras aleatórias
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(300); // Reinicia o tempo
    setGameStatus('playing'); // Muda o status para "playing"
    setIsPaused(false);
    setHintPalavra(null);
    setStars(0);
    setHighlightedSquares([]);
    setTextoDigitado('');
    setHintIndex(0);
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
    navigate('/second-mode-level/8');
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
      <h1>NÍVEL 7</h1>

      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid-7" onClick={handleClickOnSquare}>
            {Array(8).fill('').map((_, index) => (
              <React.Fragment key={index}>
                <div className="input-square">
                  {textoDigitado[index] || ''}
                  {index === cursorPosition && <span className="cursor" />}
                </div>
                {/* Exibir o traço entre o quarto e o quinto quadrado */}
                {index === 3 && <span className="dash-7">-</span>}
              </React.Fragment>
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
            <p>Digite os codigos listado abaixo.</p>
          </div>

          {/* Aplique a classe hidden-TWO diretamente no contêiner da lista de palavras */}
          <ul className={`palavras-list ${isPaused ? 'hidden' : ''}`}> 
            {palavrasOcultadas.map((palavra, index) => (
              <li key={index} className={palavrasDigitadas.includes(palavras[index]) ? 'found-one' : ''}>
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

export default SevenLevel;