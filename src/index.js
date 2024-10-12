
import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom'; // Importa a biblioteca ReactDOM para renderizar componentes React no DOM
import App from './App'; // Importa o componente principal 'App'
import './index.css';  // Importa o arquivo de estilos CSS

import { library } from '@fortawesome/fontawesome-svg-core'; // Importa a função 'library' do FontAwesome para gerenciar ícones
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'; // Importa os ícones 'faPlus' e 'faMinus' da biblioteca de ícones sólidos

// Adiciona os ícones 'faPlus' e 'faMinus' à biblioteca FontAwesome
library.add(faPlus, faMinus);

// Renderiza o componente 'App' dentro do elemento com id 'root' no DOM
ReactDOM.render(
  <React.StrictMode>  {/* React.StrictMode ajuda a identificar potenciais problemas na aplicação */}
    <App />  {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>,
  document.getElementById('root')  // Seleciona o elemento 'root' no DOM como o local de renderização
);
