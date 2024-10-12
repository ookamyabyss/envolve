<<<<<<< HEAD
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import BackgroundAudio from './components/Utils/BackgroundAudio/BackgroundAudio';

const App = () => {
    return (
        <div className="App">
            <BackgroundAudio />
=======
import React from 'react'; // Importa o React
import { BrowserRouter as Router } from 'react-router-dom'; // Importa o Router do React Router
import AppRoutes from './AppRoutes'; // Importa as rotas definidas em AppRoutes
import BackgroundAudio from './components/Utils/BackgroundAudio/BackgroundAudio'; // Importa o componente de áudio de fundo

// Componente principal da aplicação
const App = () => {
    return (
        <div className="App">
            {/* Componente de áudio de fundo que toca música durante a navegação */}
            <BackgroundAudio />

            {/* Configura o roteamento da aplicação */}
>>>>>>> menu
            <Router>
                <AppRoutes />
            </Router>
        </div>
    );
};

<<<<<<< HEAD
export default App;
=======
export default App; // Exporta o componente App como padrão
>>>>>>> menu
