import React, { useState, useEffect } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Importa o som de sucesso
import './TypingTutorial.css'; // Arquivo CSS para estilização

// Lista de palavras seguras e adequadas
const wordList = [
                  'COMPUTADOR', 'ESCOLA', 'LIVRO', 'JANELA', 'PLANETA', 'REGULAR', 'AVAREZA',
                  'CACHORRO', 'FLORESTA', 'CARRO', 'CIDADE', 'RUA', 'ESPERTO', 'EXEMPLO',
                  'FANTASMA',  'ESQUERDA', 'TALENTO', 'PERALTA', 'MOSTRAR', 'SIMPLES',
                  'REVOADA',  'PREZADO', 'COSTUME', 'SENSATA', 'HULMIDE', 'CAPITAL',
                  'CAMISA', 'FESTAS', 'MOMENTO', 'CARINHO', 'CANSADO'];

const TypingTutorial = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Estado para exibir o balão de sucesso
  const [correctWord, setCorrectWord] = useState(''); // Palavra correta que o jogador precisa digitar

  // Função para tocar o som de sucesso
  const playSound = (sound) => {
    const audio = new Audio(sound); // Cria um novo objeto de áudio
    audio.play(); // Toca o áudio
  };

  // Função para embaralhar e selecionar uma nova palavra aleatória
  const shuffleWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCorrectWord(wordList[randomIndex]); // Define uma nova palavra correta
    setInputValue(''); // Reseta o campo de entrada
    setShowSuccess(false); // Oculta o balão de sucesso
  };

  // Embaralha uma nova palavra ao carregar o componente
  useEffect(() => {
    shuffleWord();
  }, []);

  // Função para lidar com a mudança de valor no campo de entrada
  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase(); // Converte a entrada para minúsculas
    setInputValue(userInput);

    // Verifica se a palavra digitada está correta
    if (userInput === correctWord.toLowerCase()) {
      setShowSuccess(true); // Exibe o balão de sucesso
      playSound(successSound); // Toca o som de sucesso

      // Aguarda 1 minuto (60 segundos) antes de embaralhar uma nova palavra
      setTimeout(() => {
        shuffleWord(); // Seleciona uma nova palavra após 1 minuto
      }, 60000);
    }
  };

  return (
    <div className="typing-tutorial-container">

      <div className="box-1">
        <p className="message-box-4">Digite a palavra abaixo :</p>
        <p className="message-box-3">{correctWord}</p>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={`typing-input ${showSuccess ? 'success' : ''}`} // Adiciona a classe 'success' se a palavra estiver correta
            placeholder="Digite aqui..."
            autoFocus // Campo de entrada já ativo automaticamente
          />

          {/* Exibe o balão de sucesso próximo ao campo de digitação */}
          {showSuccess && (
            <div className="chat-bubble">
              Você acertou!
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default TypingTutorial;