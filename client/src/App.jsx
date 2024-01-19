import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />} />
        <Route path='/projects' element={< Projects />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
