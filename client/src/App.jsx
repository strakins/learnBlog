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
import UpdatePost from './pages/UpdatePost';
import SinglePostPage from './pages/SinglePostPage';
import ScrollToTop from './components/ScrollToTop';
import {Upgrade} from './pages/Upgrade';
// import CreatorRoute from './components/CreatorRoute';
import DashboardPage from './components/DashboardPage';
import Search from './pages/Search';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import RestrictedAcessPage from './pages/RestrictedAcessPage';
import CreatorRoute from './components/CreatorRoute';


function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />} />
        <Route path='/projects' element={< Projects />} />
        <Route path='/upgrade' element={< Upgrade />} />
        <Route path='/search' element={< Search />} />
        <Route path='/restricted' element={< RestrictedAcessPage />} />
        <Route path='*' element={< PageNotFound />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/post/:postSlug' element={< SinglePostPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<CreatorRoute />} >
          <Route path='/createpost' element={<CreatePost/>} />
        </Route>

        <Route element={<AdminRoute/>}>
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/dashboard?tab=dashboard' element={<DashboardPage />} />
        </Route>
        
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
