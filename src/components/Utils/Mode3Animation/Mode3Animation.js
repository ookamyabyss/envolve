import React, { useState, useEffect } from 'react';
import './Mode3Animation.css'; // Importa o CSS para estilização

const Mode3Animation = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(null); // Estado para controlar o item destacado
    const items = [
        { name: 'quadrado' },  // Define os itens da animação como formas geométricas
        { name: 'triangulo' },
        { name: 'circulo' },
        { name: 'retangulo' },
        { name: 'losango' },
        { name: 'hexagono' },
        { name: 'pentagono' },
        { name: 'trapezio' }
    ];

    useEffect(() => {
        // Cria um intervalo que atualiza o item destacado a cada 1 segundo (1000ms)
        const interval = setInterval(() => {
            setHighlightedIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % items.length; // Passa para o próximo item e retorna ao primeiro quando chega ao final
                return newIndex;
            });
        }, 1000); // Tempo de transição entre os destaques

        return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, [items.length]); // O efeito depende da quantidade de itens

    // Função para determinar a cor da borda do item
    const getBorderColor = (index) => {
        if (index === highlightedIndex) {
            return 'lime'; // Item atualmente destacado em verde
        }
        if (index === (highlightedIndex + 1) % items.length) {
            return 'red'; // Próximo item a ser destacado em vermelho
        }
        return 'transparent'; // Borda transparente para os outros itens
    };

    return (
        <div className="mode1-container"> {/* Container principal da animação */}
            <div className="mode1-grid"> {/* Container do grid de itens */}
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`mode1-item-container`} // Mantém o container do quadrado
                        style={{ borderColor: getBorderColor(index) }} // Define a cor da borda conforme o item destacado
                    >
                        <div className={`shape-${item.name}`}></div> {/* Exibe a forma geométrica dentro do quadrado */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mode3Animation;
