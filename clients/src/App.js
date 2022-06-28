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
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  return (
    <Router>
      <NavBar />
        <Routes>
<<<<<<< HEAD
          <Route exact path="/" element={<Home />}/>
=======
          <Route exact path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
>>>>>>> 582cea6678ff3b7fd52f51378fc466396c42f0ae
          <Route path="/curcal" element={<Curcal/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/location" element={<Location/>}/>
        </Routes>
    </Router>
  );
}
export default App;