import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  return (
    <div className='bg-slate-600'>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App