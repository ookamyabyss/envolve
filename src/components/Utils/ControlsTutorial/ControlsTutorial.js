import React, { useState, useEffect } from 'react';
import clickSound from '../../../assets/sounds/click.mp3' // Som para cliques
import './ControlsTutorial.css'; // Arquivo CSS para estilização

const TypingTutorial = () => {


  // Função para tocar o som 
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // Função para tutorial de pausar o jogo
  const tutorialPause = () => {
    playSound(clickSound);
  };

  // Função para dica de pausar o jogo
  const tutorialHint = () => {
    playSound(clickSound);
  };

  return (
    <div className="controls-tutorial-container">

      <div className="grid-container">

        <div className="box-3">
          <p className="message-box-title" >Botão de Pause ||</p>
          <button className="btn-control-two" onClick={tutorialPause}>||</button>
          <p className="message-box-text" >Serve para da uma pausa na partida.</p>
        </div>

        <div className="box-3">
          <p className="message-box-title" >Botão de Dicas ? </p>
          <button className="btn-control-two" onClick={tutorialHint}>?</button>
          <p className="message-box-text" >Serve para da uma dica do seu objetivo, as dicas tem limites.</p>
        </div>
      
      </div>

    </div>
  );
};

export default TypingTutorial;