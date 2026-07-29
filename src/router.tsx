import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import Identificacao from './pages/Identificacao/Identificacao'
import Selecao from './pages/selecao/selecao'
import Success from './pages/success/success'
import Preview from './pages/preview/preview'
import Provisorio from './pages/provisorio/provisorio'

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

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/preview"
          element={<Preview />}
        />

        <Route
          path="/provisorio"
          element={<Provisorio />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default Router