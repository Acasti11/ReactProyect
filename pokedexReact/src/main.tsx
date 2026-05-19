import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './reset style/normalize.css'
import './reset style/reboot.css'
import './reset style/reset.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
