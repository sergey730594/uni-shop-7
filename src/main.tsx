import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Добавить этот импорт
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Обернуть здесь */}
      <App />
    </BrowserRouter> {/* <-- И здесь */}
  </React.StrictMode>,
)
