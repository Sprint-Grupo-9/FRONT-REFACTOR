import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import {Component} from './components/Component.jsx'
import {All} from './All.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <All/>
  </StrictMode>,
)
