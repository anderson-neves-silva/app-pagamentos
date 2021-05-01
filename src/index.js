import React from 'react';
import ReactDOM from 'react-dom';

import User from './components/User';
import './styles/global.css';

// Renderizando na tela o componente User
ReactDOM.render(
  <User />,
  document.getElementById('root')
);