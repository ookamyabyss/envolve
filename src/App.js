import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import BackgroundAudio from './components/Utils/BackgroundAudio/BackgroundAudio';

const App = () => {
    return (
        <div className="App">
            <BackgroundAudio />
            <Router>
                <AppRoutes />
            </Router>
        </div>
    );
};

export default App;
