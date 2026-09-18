import { RouterProvider } from 'react-router-dom'
import { router } from './router-config'

function Router() {
  return <RouterProvider router={router} />
}

export default Router