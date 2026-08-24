import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/variables.css'
import './index.css'
import { router } from './router'
import { IdentificacaoProvider } from './contexts/identificacao/identificacaocontext'
import { SelectionProvider } from './contexts/selectioncontext/selectioncontext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<SelectionProvider>
    <IdentificacaoProvider>
    <RouterProvider router={router} />
    </IdentificacaoProvider>
</SelectionProvider>
  </StrictMode>,
)
