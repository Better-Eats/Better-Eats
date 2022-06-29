import './home.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {auth, provider} from '../../firebase-config.js';
import {signInWithPopup, getAuth} from 'firebase/auth';
import {useState} from 'react';

export default function Home({isAuth, setIsAuth}){
  const [newuser, setNewuser] = useState(true)
  let navigate = useNavigate();
  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      const user = auth.currentUser;
      // axios.post('/user/info', {uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, email: user.email});

      if(newuser===false){
        navigate("/curcal");
      }else {
        navigate("/newuser");
      }
    })
  }
  return (
    <div className ='home'>
        <div className="homeMotto" >
          Better Eats Better Feats
        </div>
        <div className="homeDesc" >
          Personalize a plan, track your nutrition, and order a healthy choice right to your door.
        </div>
        <button className="homeBtn" onClick={signInWithGoogle} >Continue with Google</button>
    </div>

  )
}
