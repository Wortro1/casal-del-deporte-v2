import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './components/navBar'
import Services from './components/Services'
import './styles/index.css'
import Hero from './pages/layouts/Hero'
import WhyUs from './pages/layouts/WhyUs'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <Hero/>
    <Services />

    <WhyUs />
  </StrictMode>,
)