import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomModalProvider } from './contexts/CustomModalContext.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <CustomModalProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} /> {/* 👈 Renders at /app/ */}
      </Routes>
    
    </BrowserRouter>
    </CustomModalProvider>
    </Provider>
  </React.StrictMode>,
)
