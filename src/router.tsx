import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/home.tsx'
import Identificacao from './pages/identificacao/identificacao.tsx'
import Selecao from './pages/selecao/selecao'
import Success from './pages/success/success'
import Preview from './pages/preview/preview'
import Provisorio from './pages/provisorio/provisorio'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/identificacao',
    element: <Identificacao />,
  },
  {
    path: '/selecao',
    element: <Selecao />,
  },
  {
    path: '/success',
    element: <Success />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '/provisorio',
    element: <Provisorio />,
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router