import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Metryki from './metryki.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Metryki />
  </StrictMode>,
)
