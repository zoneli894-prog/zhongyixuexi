import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter> {/* 这里改成了 HashRouter */}
      <App />
    </HashRouter> {/* 这里也要对应改掉 */}
  </React.StrictMode>,
  </React.StrictMode>,
)
