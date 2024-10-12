import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3'; // Importa o arquivo de som para o clique dos botões
import Mode1Animation from '../Mode1Animation/Mode1Animation'; // Importa o componente de animação do Modo 1
import Mode2Animation from '../Mode2Animation/Mode2Animation'; // Importa o componente de animação do Modo 2]
import Mode3Animation from '../Mode3Animation/Mode3Animation'; // Importa o componente de animação do Modo 2
import './Mode.css'; // Importa o CSS para estilização do componente

const Mode = () => {
    const navigate = useNavigate(); // Hook para navegação entre páginas
    const [hoveredButton, setHoveredButton] = useState(null); // Estado para controlar o botão sobre o qual o mouse está

    // Função para tocar um som e navegar para uma nova página
    const playSoundAndNavigate = (path) => {
        const audio = new Audio(clickSound); // Cria um novo objeto de áudio para tocar o som
        audio.play(); // Reproduz o som
        navigate(path); // Navega para o caminho especificado
    };

    return (
        <div className="menu-mode"> {/* Container principal para os botões de modo */}
            {/* Botão para o Modo 1 */}
            <button
                className="btn-mode" // Classe CSS para estilização do botão
                onClick={() => playSoundAndNavigate('/first-mode')} // Navega para '/first-mode' ao clicar
                onMouseEnter={() => setHoveredButton('first')} // Define o botão atual como 'first' ao passar o mouse
                onMouseLeave={() => setHoveredButton(null)} // Remove a definição do botão ao sair o mouse
            >
                Modo 1
                {hoveredButton === 'first' && ( // Verifica se o botão sobre o qual o mouse está é o 'first'
                    <>
                        <div className="info-container info-left"> {/* Container para animação à esquerda */}
                            {/* Aqui vai a animação do Modo 1 */}
                            <Mode1Animation/> {/* Componente de animação do Modo 1 */}
                        </div>
                        <div className="info-container info-right"> {/* Container para a descrição à direita */}
                            {/* Aqui vai a descrição do Modo 1 */}
                            <p>Encontre os itens da sua lista antes do tempo termina.</p> {/* Descrição do Modo 1 */}
                        </div>
                    </>
                )}
            </button>

            {/* Botão para o Modo 2 */}
            <button
                className="btn-mode" // Classe CSS para estilização do botão
                onClick={() => playSoundAndNavigate('/second-mode')} // Navega para '/second-mode' ao clicar
                onMouseEnter={() => setHoveredButton('second')} // Define o botão atual como 'second' ao passar o mouse
                onMouseLeave={() => setHoveredButton(null)} // Remove a definição do botão ao sair o mouse
            >
                Modo 2
                {hoveredButton === 'second' && ( // Verifica se o botão sobre o qual o mouse está é o 'second'
                    <>
                        <div className="info-container info-left"> {/* Container para animação à esquerda */}
                            {/* Aqui vai a animação do Modo 2 */}
                            <Mode2Animation/> {/* Componente de animação do Modo 2 */}
                            <img src="caminho/para/animacao2.gif" alt="Animação Modo 2" /> {/* Imagem da animação do Modo 2 */}
                        </div>
                        <div className="info-container info-right"> {/* Container para a descrição à direita */}
                            {/* Aqui vai a descrição do Modo 2 */}
                            <p>Digite as palavras ou códigos antes do tempo termina.</p> {/* Descrição do Modo 2 */}
                        </div>
                    </>
                )}
            </button>

            {/* Botão para o Modo 3 */}
            <button
                className="btn-mode" // Classe CSS para estilização do botão
                onClick={() => playSoundAndNavigate('/third-mode')} // Navega para '/third-mode' ao clicar
                onMouseEnter={() => setHoveredButton('third')} // Define o botão atual como 'third' ao passar o mouse
                onMouseLeave={() => setHoveredButton(null)} // Remove a definição do botão ao sair o mouse
            >
                Modo 3
                {hoveredButton === 'third' && ( // Verifica se o botão sobre o qual o mouse está é o 'third'
                    <>
                        <div className="info-container info-left"> {/* Container para animação à esquerda */}
                            {/* Aqui vai a animação do Modo 3 */}
                            <Mode3Animation/> {/* Componente de animação do Modo 3 */}
                            <img src="caminho/para/animacao3.gif" alt="Animação Modo 3" /> {/* Imagem da animação do Modo 3 */}
                        </div>
                        <div className="info-container info-right"> {/* Container para a descrição à direita */}
                            {/* Aqui vai a descrição do Modo 3 */}
                            <p>Complete a imagem antes do tempo termina.</p> {/* Descrição do Modo 3 */}
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};

export default Mode;
