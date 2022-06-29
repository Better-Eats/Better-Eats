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
export default function Profile(){
  const data = [
    {argument: 'Monday', value: 20},
    {argument: 'Tuesday', value: 30},
    {argument: 'Wednesday', value: 40},
  ];
  return (
    <div className='profile'>
      <button onClick={() => {console.log(auth.currentUser)}}>test</button>
      <div className='picture'>
          <img className='innerPicture' src={auth.currentUser.photoURL} alt="prop"></img>
      </div>
      <div className='welcome'>
        Welcome, {auth.currentUser.displayName}
      </div>
      <div className='graph'>
        <Paper>
          <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField='value' argumentField='argument' />
          </Chart>
        </Paper>
      </div>
    </div>
  )
}




















