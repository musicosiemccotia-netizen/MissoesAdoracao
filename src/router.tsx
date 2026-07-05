import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import Identificacao from './pages/Identificacao/Identificacao'
import Selecao from './pages/selecao/selecao'

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/identificacao"
          element={<Identificacao />}
        />

        <Route
          path="/selecao"
          element={<Selecao />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default Router