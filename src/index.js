import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { SoundProvider } from './context/SoundProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </React.StrictMode>
);
