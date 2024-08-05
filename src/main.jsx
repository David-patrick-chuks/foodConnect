import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { CartProvider } from './context/Cart.jsx'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <CartProvider> */}
        <App />
      {/* </CartProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
)
