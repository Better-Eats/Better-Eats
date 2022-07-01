import './profile.css';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   BarSeries,
//   SplineSeries,
//   Legend,
// } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {auth} from '../../firebase-config.js';
import axios from 'axios';
import History from './History.jsx';
import EditIcon from '@mui/icons-material/Edit';;


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

  // const [entry, setEntry] = useState('');
  // const handleChange = (e) => {
  //   setEntry(e.target.value);
  // }


    //orange chicken
    //rice
    //frosted flakes
  // const [entry, setEntry] = useState('');
  // const handleClick = (e) => {
  //   axios.get('/cal', {params: {query: entry, dataType: 'Branded'}})
  //     .then((results) => {
  //       const itemId = results.data.foods[0].fdcId;
  //       axios.post('/cal', {uid: process.env.REACT_APP_GOOGLE_UID, currentTotal: {calories: 1500, carbohydrates: 0, fat: 0, protein: 0}, date: '6/29/2022', fdcid: itemId, id: itemId})
  //         .then((res) => {
  //           console.log(res);
  //         })
  //     })
  // }
  // const handleChange = (e) => {
  //   setEntry(e.target.value);
  // }

  const handleGoalClick = (e) => {
    setCurrentDisplay('graph');
    console.log(userData.goalHistory)
  };

  const handleHistoryClick = (e) => {
    setCurrentDisplay('history');
  };

  // current Goal, number, edit
  // process.env.REACT_APP_UID

  useEffect(() => {
    axios.get('/users', {params: {id: process.env.REACT_APP_GOOGLE_UID}})
    .then((results) => {
      setGoal(results.data[0].goal)
      return results.data[0].goal
    })
    .then((goal) => {
      axios.get('/users/history', {params: {id: process.env.REACT_APP_GOOGLE_UID, limit: 7}})
      .then((results) => {
        const goalHistory = [];
        const itemHistory = [];
        const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        results.data.forEach((item) => {
          let over = 0;
          let calories = item.totalcal;
          if (calories > goal) {
            over = calories - goal;
            calories = calories - over;
          }
          goalHistory.push({name: dates[new Date(item.date).getMonth()] + ', ' + new Date(item.date).getDate(), calories: calories, over: over, amt:200});
          itemHistory.push({date: dates[new Date(item.date).getMonth()] + ', ' + new Date(item.date).getDate(), items: item.items});
        })
        setUserData({...userData, goalHistory: goalHistory, itemHistory: itemHistory})
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
      <div className='goalContainer' >
        <div className='currentGoal'>Current Goal : <span className="goalCal"> {goal} cal.</span>
        <button style={{}} ><EditIcon sx={{color: '#B7CE63', backgroundColor: "fff"}} ></EditIcon></button>
        </div>

      </div>
      <div className='detailContainer'>
        <div>
          <div className='buttons'>
            <button className='goalButton' onClick={handleGoalClick}>
              See past 7 days
            </button>
            <button className='historyButton' onClick={handleHistoryClick}>
              Item history
            </button>
          </div>
        </div>
        {currentDisplay === 'graph' ?
        <div className='graph'>
          <BarChart
            barSize={70}
            width={1000}
            height={500}
            data={userData.goalHistory}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 5
            }} >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis unit={'cal'} />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" stackId="a" fill="#B7CE63" />
            <Bar dataKey="over" stackId="a" fill="#DA2C38" />
          </BarChart>
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




















