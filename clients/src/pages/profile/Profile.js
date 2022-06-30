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
import History from './History.jsx'

export default function Profile(){
  const data = [
    {argument: 'Monday', value: 20},
    {argument: 'Tuesday', value: 30},
    {argument: 'Wednesday', value: 40},
  ];
  const [userData, setUserData] = useState({
    goalHistory: [],
    itemHistory: [],
    goal: 0
  });
  const [goal, setGoal] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState('graph');

  // const handleTest = (e) => {
  //   const data = {username: 'josh', goal: 100, uid: auth.currentUser.uid};
  //   axios.post('/users/newUser', data)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log('error posting', err);
  //   })
  // }


  // const handleClick = (e) => {
  //   axios.get('/cal', {params: {query: entry, dataType: 'Branded'}})
  //     .then((results) => {
  //       const itemId = results.data.foods[0].fdcId;
  //       axios.post('/cal', {uid: auth.currentUser.uid, currentTotal: {calories: 0, carbohydrates: 0, fat: 0, protein: 0}, date: '6/28/2022', fdcid: itemId, id: itemId})
  //         .then((res) => {
  //           console.log(res);
  //         })
  //     })
  // }

  const handleGoalClick = (e) => {
    setCurrentDisplay('graph');
  };

  const handleHistoryClick = (e) => {
    setCurrentDisplay('history');
  };

  useEffect(() => {
    axios.get('/users/history', {params: {id: process.env.REACT_APP_UID, limit: 7}})
      .then((results) => {
        const goalHistory = [];
        const itemHistory = [];
        results.data.forEach((item) => {
          goalHistory.push({argument: item.date, value: item.totalcal + Math.random(1) * 100});
          itemHistory.push({date: item.date, items: item.items});
        })
        setUserData({...userData, goalHistory: goalHistory, itemHistory: itemHistory})
      })
      .then(() => {
        axios.get('/users', {params: {id: process.env.REACT_APP_UID}})
          .then((results) => {
            setGoal(results.data[0].goal)
          })
      })
      .catch((err) => {
        console.log('error getting data', err);
      })
  }, [])



  return (
    <div className='profile'>
      <div className='picture'>
          <img className='innerPicture' src={auth.currentUser.photoURL} alt="prop"></img>
      </div>
      <div className='welcome'>
        Welcome, {auth.currentUser.displayName}
      </div>
      <div className='detailContainer'>
        <div>
          <div className='buttons'>
            <button className='goalButton' onClick={handleGoalClick}>
              goal history
            </button>
            <button className='historyButton' onClick={handleHistoryClick}>
              item history
            </button>
            {/* <button onClick={handleTest}>add user</button> */}
          </div>
        </div>
        {currentDisplay === 'graph' ?
        <div className='graph'>
          <Paper>
            <Chart data={userData.goalHistory} >
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField='value' argumentField='argument'   />
              <Animation />
            </Chart>
          </Paper>
        </div> :
        <div className="historyContainer">
          {userData.itemHistory.map((item, index) =>
           <History item={item} key={index}/>
          )}
          </div>
          }
      </div>
    </div>
  )
}




















