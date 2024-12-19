import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextWrapper } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextWrapper>
        <App/>
    </AuthContextWrapper>
  </StrictMode>,
)
