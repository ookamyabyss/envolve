import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';  
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários



library.add(faPlus, faMinus);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
