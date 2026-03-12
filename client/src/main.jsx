import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#16163a',
          color: '#e2e8f0',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: '#16163a' },
          duration: 4000,
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#16163a' },
          duration: 5000,
        },
      }}
    />
  </React.StrictMode>
);