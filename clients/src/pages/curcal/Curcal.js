import './curcal.css'
import {useNavigate} from 'react-router-dom';

export default function Curcal(){
  let navigate = useNavigate();

  return (
    <div className ='curcal'>
      current cal page
      <button onClick={() => {navigate('/profile')}}>navigate</button>
    </div>

  )
}
