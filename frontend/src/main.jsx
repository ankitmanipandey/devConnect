import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from '../config/Store/appStore.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <StrictMode>
      <ToastContainer />
      <App />
    </StrictMode >
  </Provider>
)
