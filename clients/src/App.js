import axios from 'axios';
import {useState} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Outlet, Link} from 'react-router-dom';
import {auth} from './firebase-config.js';
import Home from './pages/home/Home.js';
import Curcal from './pages/curcal/Curcal.js';
import Profile from './pages/profile/Profile.js';
import Location from './pages/location/Location.js';
import NavBar from './components/navbar/Navbar.js';
import Newuser from './components/newuser/Newuser.js';
function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  return (
    <Router>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth}/>
        <Routes>
          <Route exact path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path="/curcal" element={<Curcal/>}/>
          <Route path="/newuser" element={<Newuser/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/location" element={<Location/>}/>
        </Routes>
    </Router>
  );
}
export default App;