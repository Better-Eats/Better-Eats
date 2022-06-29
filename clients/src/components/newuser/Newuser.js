import './newuser.css';
import {useState} from 'react';
import {auth} from '../../firebase-config.js';
//import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link} from 'react-router-dom';

export default function Newuser(){
 const [curPage, setCurPage] = useState(1);
 const [username, setUsername] = useState(auth.currentUser.displayName);

 const buttons1 = [
  <Button onClick={(e)=>setAge(e.target.name)} name="20" key="one">20's</Button>,
  <Button onClick={(e)=>setAge(e.target.name)} name="30" key="two">30's</Button>,
  <Button onClick={(e)=>setAge(e.target.name)} name="40" key="three">40's</Button>,
];
const buttons2 = [
  <Button onClick={(e)=>setAge(e.target.name)} name="50" key="one">50's</Button>,
  <Button onClick={(e)=>setAge(e.target.name)} name="60" key="two">60's</Button>,
  <Button onClick={(e)=>setAge(e.target.name)} name="70" key="three">70's</Button>,
];
 const [gender, setGender] = useState('female');
 const [weight, setWeight] = useState(100);
 const [age, setAge] = useState(20);
 const [calorie, setCalorie] = useState('1300');
 const [height, setHeight] = useState({
   'ft': '' ,
   'in': ''
 })
 function onlyOne (check) {
   const checkboxes = document.getElementsByName('checkbox');
   checkboxes.forEach((item) => {
     if (item !== check.target) {
       item.checked = false;
     }
   })
   setGender(check.target.id);

 }
 const calCal=() => {
  if (gender==='female') {
    var cal = 10*weight*0.4536 + 6.25*(height.ft*30.48+height.in*2.54) - (5*age) - 161;
  } else {
    var cal = 10*weight*0.4536 + 6.25*(height.ft*30.48+height.in*2.54) - (5*age) + 5;
  }
  setCalorie(cal.toFixed());
 }
 console.log('age', age, 'weight', weight, 'height', height, 'gender', gender);

 const renderView=()=>{
  switch (curPage){
    case 1:
      return (<form className="form">
        <div className="form1Text">Let's get started! A few questions to customize your Better Eats plan.</div>
        <div><button className="form1Btn" onClick={()=>setCurPage(curPage+1)}>Continue</button></div>
      </form>);
    case 2:
      return (
        <form className="form">
          <div className="form2Text">
            <label className='form2label'>Choose a username:</label>
            <input className='nu-input' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className='form2label'>What is your ideal meal plan</label>
            <div className="mealplan">
              <button className = 'form2Btn' onClick={() => setCurPage(curPage + 1)}>Keto Plan</button>
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>Atkins Plan</button>
            </div>
            <div className="mealplan">
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>Paelo Plan</button>
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>No Carbs</button>
            </div>
            <div className="mealplan">
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>Vegan</button>
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>Gluten-Free</button>
            </div>
            <div className="mealplan">
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>Pescatarian</button>
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>All Protein Baby</button>
            </div>
            <div className="mealplan">
              <button className='form2Btn' onClick={() => setCurPage(curPage + 1)}>I'm Not Sure</button>
            </div>
          </div>
        </form>
      )
    case 3:
      return (
        <form className="form">
          <div className="form3Wrapper">
            <div className="form3Text">Personal profile</div>
            <div className="form3Check">
              <input type="checkbox" name="checkbox" id="male" onClick={onlyOne} />
              <label>Male</label>
              <input type="checkbox" name="checkbox" id="female" onClick={onlyOne}/>
              <label>Female</label>
            </div>
            <label className="form3Label">How tall are you? (optional)</label>
            <TextField id="standard-basic" onChange={(e)=>setHeight({...height, ft:e.target.value})} label="ft" variant="standard" />
            <TextField id="standard-basic" onChange={(e)=>setHeight({...height, in:e.target.value})} label="in" variant="standard" />
            <label>How much do you weight? (optional)</label>
            <TextField id="standard-basic" onChange={(e)=>setWeight(e.target.value)} label="Lbs" variant="standard" />
            <label>What is your age?</label>
            <div className="form3Btns">
            <ButtonGroup onClick={(e)=> setAge(e.target.name)} size="large" aria-label="large button group">
              {buttons1}
            </ButtonGroup>
            <ButtonGroup onClick={(e)=> setAge(e.target.name)}  size="large" aria-label="large button group">
              {buttons2}
            </ButtonGroup>
            </div>
          </div>
          <div>
            <button className="form2Btn" onClick={() => {setCurPage(curPage + 1); calCal();}}>Continue</button>
          </div>
        </form>
      )
      case 4:
        return (
          <form className="form">
            <div className="form4Text">
              <label className='form2label'>What would you describe your lifestyle?</label>
              <button className ="form4Btn" onClick={() => setCurPage(curPage + 1)}>Spend most of the day sitting</button>
              <button className="form4Btn" onClick={() => setCurPage(curPage + 1)}>Spend most of the day standing</button>
              <button className="form4Btn" onClick={() => setCurPage(curPage + 1)}>Spend most of the day doing some physical activity</button>
              <button className="form4Btn" onClick={() => setCurPage(curPage + 1)}>Spend most of the day doing some heavy physical activity</button>
            </div>
          </form>
        )
        case 5:
          return (
            <form className="form">
              <div className="form5Text">
                <label className='form5label'>
                  All done, {username}!
                </label>
                <br/>
                <label className='form2label'>
                  Your recommended daily calories intake is
                </label>
                <br />
                <label className='form5labelC'>
                {calorie} Calories
                </label>
                <Link to="/curcal" style={{textDecoration:"none"}}>
                  <button className="form5Btn" >Go To Dashboard</button>
                </Link>
              </div>
            </form>
          )
    default:
      return (<form className="form">
        <div className="form1Text">Let's get started! A few questions to customize your Better Eats plan.</div>
        <div><button className="form1Btn" onClick={()=>setCurPage(curPage+1)}>Continue</button></div>
      </form>);
   }
 }
 return(
    <div className="newuser">
     { renderView()}
    </div>
  )
}