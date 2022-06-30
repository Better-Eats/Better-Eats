import './profile.css';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import {auth} from '../../firebase-config.js';
import axios from 'axios';






export default function Profile(){
  const data = [
    {argument: 'Monday', value: 20},
    {argument: 'Tuesday', value: 30},
    {argument: 'Wednesday', value: 40},
  ];
  const [userData, setUserData] = useState([]);



//1321321 uid
//limit :7
  useEffect(() => {
    axios.get('/users/history', {params: {id: 1321321, limit: 7}})
      .then((results) => {
        const history = [];
        console.log(results.data);
        results.data.forEach((item) => {
          history.push({argument: item.date, value: item.totalcal + Math.random(1) * 100})
        })
        setUserData(history);
      })
      .then(() => {
        console.log('this is userdata', userData);
      })
  }, [])


  return (
    <div className='profile'>
      <button onClick={() => {console.log(auth.currentUser)}}>test</button>
      <div className='picture'>
          <img className='innerPicture' src={auth.currentUser.photoURL} alt="prop"></img>
      </div>
      <div className='welcome'>
        Welcome, {auth.currentUser.displayName}
      </div>
      <div>
        <div>
          <div>
            <button>
              goal history
            </button>
            <button>
              item history
            </button>
          </div>

        </div>
        <div className='graph'>
          <Paper>
            <Chart data={userData}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField='value' argumentField='argument'  />
              <Animation />
            </Chart>
          </Paper>
        </div>
      </div>
    </div>
  )
}




















