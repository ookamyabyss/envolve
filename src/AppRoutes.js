import React from 'react'; // Importa a biblioteca React
import { Routes, Route } from 'react-router-dom'; // Importa os componentes 'Routes' e 'Route' do React Router para gerenciamento de rotas

// Importa os componentes das páginas principais
import Home from './components/Pages/Home/Home'; 
import Options from './components/Pages/Options/Options'; 
import Extras from './components/Pages/Extras/Extras'; 
import HowToPlay from './components/Pages/HowToPlay/HowToPlay'; 
import TutorialPage from './components/Pages/TutorialPage/TutorialPage';
import ChallengeModeSelection from './components/Pages/ChallengeModeSelection/ChallengeModeSelection';  
import FirstMode from './components/Pages/FirstMode/FirstMode';
import SecondMode from './components/Pages/SecondMode/SecondMode';
import ThirdMode from './components/Pages/ThirdMode/ThirdMode';

// Importa os componentes dos níveis do 'Fist Mode'
import FirstModeOneLevel from './components/Pages/FirstModeLevels/OneLevel/OneLevel';
import FirstModeTwoLevel from './components/Pages/FirstModeLevels/TwoLevel/TwoLevel';
import FirstModeThreeLevel from './components/Pages/FirstModeLevels/ThreeLevel/ThreeLevel';
import FirstModeFourLevel from './components/Pages/FirstModeLevels/FourLevel/FourLevel';
import FirstModeFiveLevel from './components/Pages/FirstModeLevels/FiveLevel/FiveLevel';
import FirstModeSixLevel from './components/Pages/FirstModeLevels/SixLevel/SixLevel';
import FirstModeSevenLevel from './components/Pages/FirstModeLevels/SevenLevel/SevenLevel';
import FirstModeEightLevel from './components/Pages/FirstModeLevels/EightLevel/EightLevel';
import FirstModeNineLevel from './components/Pages/FirstModeLevels/NineLevel/NineLevel';
import FirstModeTenLevel from './components/Pages/FirstModeLevels/TenLevel/TenLevel';

// Importa os componentes dos níveis do 'Second Mode'
import SecondModeOneLevel from './components/Pages/SecondModeLevels/OneLevel/OneLevel';
import SecondModeTwoLevel from './components/Pages/SecondModeLevels/TwoLevel/TwoLevel';
import SecondModeThreeLevel from './components/Pages/SecondModeLevels/ThreeLevel/ThreeLevel';
import SecondModeFourLevel from './components/Pages/SecondModeLevels/FourLevel/FourLevel';
import SecondModeFiveLevel from './components/Pages/SecondModeLevels/FiveLevel/FiveLevel';
import SecondModeSixLevel from './components/Pages/SecondModeLevels/SixLevel/SixLevel';
import SecondModeSevenLevel from './components/Pages/SecondModeLevels/SevenLevel/SevenLevel';
import SecondModeEightLevel from './components/Pages/SecondModeLevels/EightLevel/EightLevel';
import SecondModeNineLevel from './components/Pages/SecondModeLevels/NineLevel/NineLevel';
import SecondModeTenLevel from './components/Pages/SecondModeLevels/TenLevel/TenLevel';

// Importa os componentes dos níveis do 'Third Mode'
import ThirdModeOneLevel from './components/Pages/ThirdModeLevels/OneLevel/OneLevel';
import ThirdModeTwoLevel from './components/Pages/ThirdModeLevels/TwoLevel/TwoLevel';
import ThirdModeThreeLevel from './components/Pages/ThirdModeLevels/ThreeLevel/ThreeLevel';
import ThirdModeFourLevel from './components/Pages/ThirdModeLevels/FourLevel/FourLevel';
import ThirdModeFiveLevel from './components/Pages/ThirdModeLevels/FiveLevel/FiveLevel';
import ThirdModeSixLevel from './components/Pages/ThirdModeLevels/SixLevel/SixLevel';
import ThirdModeSevenLevel from './components/Pages/ThirdModeLevels/SevenLevel/SevenLevel';
import ThirdModeEightLevel from './components/Pages/ThirdModeLevels/EightLevel/EightLevel';
import ThirdModeNineLevel from './components/Pages/ThirdModeLevels/NineLevel/NineLevel';
import ThirdModeTenLevel from './components/Pages/ThirdModeLevels/TenLevel/TenLevel';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Define a rota para a página do tutorial */}
            <Route path="/tutorial" element={<TutorialPage />} />

            {/* Define a rota para a página inicial */}
            <Route path="/" element={<Home />} />

            {/* Define a rota para a página de opções */}
            <Route path="/options" element={<Options />} />

            {/* Define a rota para a página de extras */}
            <Route path="/extras" element={<Extras />} />

            {/* Define a rota para a página 'Como Jogar' */}
            <Route path="/how-to-play" element={<HowToPlay />} />

            {/* Define a rota para a seleção do modo desafio */}
            <Route path="/challenge-mode-selection" element={<ChallengeModeSelection />} />

            {/* Define a rota para o 'Fist Mode' */}
            <Route path="/first-mode" element={<FirstMode />} />

            {/* Define a rota para o 'Second Mode' */}
            <Route path="/second-mode" element={<SecondMode />} />

            {/* Define a rota para o 'Third Mode' */}
            <Route path="/third-mode" element={<ThirdMode />} />
            
            {/* Define as rotas para os níveis do 'Fist Mode' */}
            <Route path="/first-mode-level/1" element={<FirstModeOneLevel />} />
            <Route path="/first-mode-level/2" element={<FirstModeTwoLevel />} />
            <Route path="/first-mode-level/3" element={<FirstModeThreeLevel />} />
            <Route path="/first-mode-level/4" element={<FirstModeFourLevel />} />
            <Route path="/first-mode-level/5" element={<FirstModeFiveLevel />} />
            <Route path="/first-mode-level/6" element={<FirstModeSixLevel />} />
            <Route path="/first-mode-level/7" element={<FirstModeSevenLevel />} />
            <Route path="/first-mode-level/8" element={<FirstModeEightLevel />} />
            <Route path="/first-mode-level/9" element={<FirstModeNineLevel />} />
            <Route path="/first-mode-level/10" element={<FirstModeTenLevel />} />

            {/* Define as rotas para os níveis do 'Second Mode' */}
            <Route path="/second-mode-level/1" element={<SecondModeOneLevel />} />
            <Route path="/second-mode-level/2" element={<SecondModeTwoLevel />} />
            <Route path="/second-mode-level/3" element={<SecondModeThreeLevel />} />
            <Route path="/second-mode-level/4" element={<SecondModeFourLevel />} />
            <Route path="/second-mode-level/5" element={<SecondModeFiveLevel />} />
            <Route path="/second-mode-level/6" element={<SecondModeSixLevel />} />
            <Route path="/second-mode-level/7" element={<SecondModeSevenLevel />} />
            <Route path="/second-mode-level/8" element={<SecondModeEightLevel />} />
            <Route path="/second-mode-level/9" element={<SecondModeNineLevel />} />
            <Route path="/second-mode-level/10" element={<SecondModeTenLevel />} />

            {/* Define as rotas para os níveis do 'Third Mode' */}
            <Route path="/third-mode-level/1" element={<ThirdModeOneLevel />} />
            <Route path="/third-mode-level/2" element={<ThirdModeTwoLevel />} />
            <Route path="/third-mode-level/3" element={<ThirdModeThreeLevel />} />
            <Route path="/third-mode-level/4" element={<ThirdModeFourLevel />} />
            <Route path="/third-mode-level/5" element={<ThirdModeFiveLevel />} />
            <Route path="/third-mode-level/6" element={<ThirdModeSixLevel />} />
            <Route path="/third-mode-level/7" element={<ThirdModeSevenLevel />} />
            <Route path="/third-mode-level/8" element={<ThirdModeEightLevel />} />
            <Route path="/third-mode-level/9" element={<ThirdModeNineLevel />} />
            <Route path="/third-mode-level/10" element={<ThirdModeTenLevel />} />

            {/* Adicione rotas para outros níveis conforme necessário */}
        </Routes>
    );
};

export default AppRoutes; // Exporta o componente AppRoutes para uso em outras partes da aplicação

