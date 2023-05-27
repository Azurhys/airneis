import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Menu from './composants/Menu'
import Footer from './composants/front/Footer'
import { Outlet } from 'react-router-dom'





function App() {
  

  return (
    <div className="App">
      <Menu />
      <div className="container-fluid m-0 p-0 justify-content-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
