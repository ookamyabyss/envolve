import React from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import Menu from '../../Utils/Menu/Menu';
import FloatingMenu from '../../Utils/FloatingMenu/FloatingMenu';
import FullScreenButton from '../../Utils/FullScreenButton/FullScreenButton';

const Home = () => {
    return (
        <div className="Home">
            <BackgroundVideo />
            <Menu />
            <FloatingMenu />
            <FullScreenButton />
        </div>
    );
};

export default Home;
