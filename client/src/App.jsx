import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import AdminRoute from './components/AdminRoute';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />} />
        <Route path='/projects' element={< Projects />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute/>}>
          <Route path='/createpost' element={<CreatePost/>} />
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
