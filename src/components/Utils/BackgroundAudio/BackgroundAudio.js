import React from 'react';
// Importa o arquivo de áudio que será usado como fundo
import backgrondMenu from '../../../assets/sounds/backgrondMenu.mp3';

const BackgroundAudio = () => {
    return (
        <div>
            {/* 
                Componente de áudio para tocar música de fundo
                - id: 'background-audio' é usado para identificação do elemento
                - src: caminho para o arquivo de áudio
                - autoPlay: inicia a reprodução automaticamente
                - loop: faz com que o áudio se repita indefinidamente
            */}
            <audio 
                id="background-audio" 
                src={backgrondMenu} 
                autoPlay 
                loop 
            />
        </div>
    );
};

export default BackgroundAudio;
