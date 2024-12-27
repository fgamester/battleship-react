import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GameContext } from './context/GameContext.jsx'
import '../src/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameContext>
      <App />
    </GameContext>
  </StrictMode>,
)
