import React from 'react'
import ReactDOM from 'react-dom/client'

// NEEDED IMPORTS FOR ROUTING!
import router from './router/BrowserRouter.jsx'
import { RouterProvider } from 'react-router-dom'

// ROUTERPROVIDER + BROWSER ROUTER RENDERING
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);