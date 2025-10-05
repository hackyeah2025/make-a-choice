import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StatsProvider } from './hooks/useStats';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StatsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StatsProvider>
);