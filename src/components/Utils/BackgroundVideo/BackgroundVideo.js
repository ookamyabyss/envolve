import React from 'react';
<<<<<<< HEAD
import './BackgroundVideo.css';
import index from  '../../../assets/videos/index.mp4'
=======
// Importa o arquivo de vídeo que será usado como fundo
import './BackgroundVideo.css';
import index from '../../../assets/videos/index.mp4';
>>>>>>> menu

const BackgroundVideo = () => {
    return (
        <div>
<<<<<<< HEAD
            <video id="background-video" src={index} autoPlay loop muted />
=======
            {/* 
                Componente de vídeo para tocar como fundo
                - id: 'background-video' é usado para identificação do elemento
                - src: caminho para o arquivo de vídeo
                - autoPlay: inicia a reprodução automaticamente
                - loop: faz com que o vídeo se repita indefinidamente
                - muted: silencia o áudio do vídeo
            */}
            <video 
                id="background-video" 
                src={index} 
                autoPlay 
                loop 
                muted 
            />
>>>>>>> menu
        </div>
    );
};

<<<<<<< HEAD
export default BackgroundVideo;
=======
export default BackgroundVideo;
>>>>>>> menu
