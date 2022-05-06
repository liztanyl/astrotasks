import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import 'regenerator-runtime';

import App from './App.jsx';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
