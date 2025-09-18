import { useState } from 'react'
import './App.css'
import Header from './components/header/page'
import Sidebar from './components/sidebar/page'
import Home from './components/home/page'
import Produtos from './components/produtos/page'
import TipoProdutos from './components/tipoprodutos/page'

function App() {
  //alert(window.location.search)
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const selectContent = () => {
    switch (window.location.search) {
      case "?=produtos":
        return <Produtos />
      case "?=tipoprodutos":
        return <TipoProdutos />  
      default:
        return <Home />
    }
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      {
        selectContent()
      }
    </div>
  )
}

export default App
