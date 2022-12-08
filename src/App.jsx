import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Company from './components/pages/company'
import Contact from './components/pages/contact'
import Home from './components/pages/home'
import Container from './components/layouts/container'
import NewProject from './components/pages/NewProject'
import Menu from './components/layouts/menu'
import Footer from './components/layouts/footer'
import Projects from './components/pages/projects'
import Project from './components/pages/project'


function App() {

  return (
    <BrowserRouter>
    <Menu></Menu>
    <Container customClass = 'min-height'>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Company" element={<Company/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/NewProject" element={<NewProject/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      <Route path="/Project/:id" element={<Project/>}/>
    </Routes>
    </Container>
    <Footer/>
    </BrowserRouter>

  )
}

export default App
