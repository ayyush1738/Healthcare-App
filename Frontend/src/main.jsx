import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Diagnose from './Components/Diagnose.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App/>} />
      <Route path="/Diagnose" element={<Diagnose />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
