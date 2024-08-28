import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home'; 
import Options from './components/Pages/Options/Options'; 
import Extras from './components/Pages/Extras/Extras'; 
import HowToPlay from './components/Pages/HowToPlay/HowToPlay'; 
import TutorialPage from './components/Pages/TutorialPage/TutorialPage';
import ChallengeModeSelection from './components/Pages/ChallengeModeSelection/ChallengeModeSelection';  


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/tutorial" element={<TutorialPage />} />

            <Route path="/" element={<Home />} />
            <Route path="/options" element={<Options />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/challenge-mode-selection" element={<ChallengeModeSelection />} />
        </Routes>
    );
};

export default AppRoutes;