import "./navbar.css";
import {Link} from  "react-router-dom";
import logo from "../../assets/logo.png"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase-config.js';
export default function NavBar({isAuth, setIsAuth}) {
  const signUserOut = () => {
    signOut(auth)
    .then(()=> {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname="/";
    })
  }
  return(
    <div className="navbarContainer">
      <div className="navbarLeft" >  </div>
      <div className="navbarCenter">
        <Link to="/" style={{textDecoration:"none"}}>
          <img className="logoImg" src={logo} alt=""/>
        </Link>
      </div>
    <div className="navbarRight">
      {isAuth? <div className="navIcons">

      <Link to="/location" style={{textDecoration:"none"}}>
      <RestaurantIcon className="navIcon"/>
      </Link>
      <Link to="/profile" style={{textDecoration:"none"}}>
      <PersonIcon className="navIcon" />
      </Link>
      <ShoppingCartIcon className="navIcon"/>

      <LogoutIcon className="navIcon" onClick={signUserOut}/>
      </div> : <></>}
    </div>
  </div>
  )
}