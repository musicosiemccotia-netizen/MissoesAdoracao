import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './index.css'
import App from './App.tsx'
import { IdentificacaoProvider } from './contexts/identificacao/identificacaocontext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IdentificacaoProvider>
      <App />
    </IdentificacaoProvider>
  </StrictMode>,
)
