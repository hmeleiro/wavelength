import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Room from './routes/Room'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/test',
    element: <div>Hello world!</div>,
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>   </React.StrictMode>/React.StrictMode>
  <RouterProvider router={router} />
)
