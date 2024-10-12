import React, { useState, useEffect } from 'react';
import item1Img from '../../../assets/imagens_tutorial/gaviota.png'; // Importa a imagem do item 1
import item2Img from '../../../assets/imagens_tutorial/morango.png'; // Importa a imagem do item 2
import item3Img from '../../../assets/imagens_tutorial/picole.png'; // Importa a imagem do item 3
import item4Img from '../../../assets/imagens_tutorial/skate.png'; // Importa a imagem do item 4
import item5Img from '../../../assets/imagens_tutorial/cone.png'; // Importa a imagem do item 5
import item6Img from '../../../assets/imagens_tutorial/hidrante.png'; // Importa a imagem do item 6
import item7Img from '../../../assets/imagens_tutorial/mala.png'; // Importa a imagem do item 7
import item8Img from '../../../assets/imagens_tutorial/bicicleta.png'; // Importa a imagem do item 8

import './Mode1Animation.css'; // Importa o arquivo CSS para a estilização

const Mode1Animation = () => {
    // Estado para armazenar o índice do item que será destacado
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    // Array contendo os itens com seus nomes e caminhos das imagens
    const items = [
        { name: 'item1', src: item1Img }, // Item 1 com nome e imagem correspondente
        { name: 'item2', src: item2Img }, // Item 2 com nome e imagem correspondente
        { name: 'item3', src: item3Img }, // Item 3 com nome e imagem correspondente
        { name: 'item4', src: item4Img }, // Item 4 com nome e imagem correspondente
        { name: 'item5', src: item5Img }, // Item 5 com nome e imagem correspondente
        { name: 'item6', src: item6Img }, // Item 6 com nome e imagem correspondente
        { name: 'item7', src: item7Img }, // Item 7 com nome e imagem correspondente
        { name: 'item8', src: item8Img }  // Item 8 com nome e imagem correspondente
    ];

    // Hook useEffect para mudar o item destacado a cada 1 segundo (1000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            // Atualiza o índice do item destacado, reiniciando após o último item
            setHighlightedIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % items.length; // Gira os índices dos itens
                return newIndex;
            });
        }, 1000); // Intervalo de 1 segundo para a mudança dos itens

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [items.length]); // O efeito depende da quantidade de itens

    // Função para determinar a cor da borda de acordo com o item destacado
    const getBorderColor = (index) => {
        if (index === highlightedIndex) {
            return 'lime'; // Borda verde para o item atualmente destacado
        }
        if (index === (highlightedIndex + 1) % items.length) {
            return 'red'; // Borda vermelha para o próximo item
        }
        return 'transparent'; // Sem borda para os outros itens
    };

    return (
        <div className="mode1-container"> {/* Container principal da animação */}
            <div className="mode1-grid"> {/* Grid que organiza os itens */}
                {items.map((item, index) => ( // Mapeia os itens para criar os elementos visuais
                    <div 
                        key={index} 
                        className="mode1-item-container" 
                        style={{ borderColor: getBorderColor(index) }} // Define a cor da borda
                    >
                        <img
                            src={item.src} // Define a fonte da imagem
                            alt={item.name} // Texto alternativo para a imagem
                            className="mode1-item-image" // Classe CSS para estilizar a imagem
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mode1Animation; 
