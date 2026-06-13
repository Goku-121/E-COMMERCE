import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import 'animate.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-loading-skeleton/dist/skeleton.css";
import App from './App.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)