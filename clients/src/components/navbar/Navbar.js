import "./navbar.css";
import {Link} from  "react-router-dom";
import logo from "../../assets/logo.png"

export default function NavBar() {

  return(
    <div className="navbarContainer">
      <div className="navbarLeft" >  </div>
      <div className="navbarCenter">
        <Link to="/" style={{textDecoration:"none"}}>
          <img className="logoImg" src={logo} alt=""/>
        </Link>
      </div>
    <div className="navbarRight">

    </div>
  </div>
  )
}