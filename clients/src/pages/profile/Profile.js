import React from 'react';
import './profile.css';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {auth} from '../../firebase-config.js';
import axios from 'axios';
import History from './History.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = React.useState(false);
  const [entry, setEntry] = useState('');

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
  // const handleClick = (e) => {
  //   axios.get('/cal', {params: {query: entry, dataType: 'Branded'}})
  //     .then((results) => {
  //       const itemId = results.data.foods[0].fdcId;
  //       axios.post('/cal', {uid: auth.currentUser.uid, currentTotal: {calories: 0, carbohydrates: 0, fat: 0, protein: 0}, date: '6/22/2022', fdcid: itemId, id: itemId})
  //         .then((res) => {
  //           console.log(res);
  //         })
  //     })
  // }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoalClick = (e) => {
    setCurrentDisplay('graph');
    console.log(userData.goalHistory)
  };

  const handleHistoryClick = (e) => {
    setCurrentDisplay('history');
  };

  // const handleEditClick =(e) => {
  //   axios.put('/users', {uid: auth.currentUser.uid, goal: 2000})
  //     .then((res) => {
  //       console.log(res);
  //     })
  // }

  const changeHandler = (e) => {
    setEntry(e.target.value);
  }

  const handleSubmitEditGoal = (e) => {
    e.preventDefault();
    console.log('acutual value', entry)
    axios.put(`/users`, {goal: Number(entry), uid: auth.currentUser.uid } )
      .then((result) => {
        console.log('put result==>', result.data.goal);
        setGoal(Number(entry))
      })
      .catch((err) => {
        console.log('error getting data', err);
      })
      .then(() => {
        handleClose();
        setEntry('');
      })
  }

  useEffect(() => {
    axios.get('/users', {params: {id: auth.currentUser.uid}})
    .then((results) => {
      setGoal(results.data[0].goal)
      return results.data[0].goal
    })
    .then((goal) => {
      axios.get('/users/history', {params: {id: auth.currentUser.uid, limit: 7}})
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
  }, [goal])



  return (
    <div className='profile'>
      <div className='picture'>
          <img className='innerPicture' src={auth.currentUser.photoURL} alt="prop"></img>
      </div>
      <div className='welcome'>
        Hello {auth.currentUser.displayName}!
      </div>
      <div className='goalContainer' >
        <div className='currentGoal'>Current Goal : <span className="goalCal"> {goal} cal.</span>
          <Button onClick={handleOpen}>
            <ModeEditOutlineOutlinedIcon sx={{ color: '#fff', border: '2px solid #fff', padding: '2px' }} ></ModeEditOutlineOutlinedIcon>
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Your Current Calories
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Type a number for your new target calories.
            </Typography><br></br>
            <form onSubmit={handleSubmitEditGoal} >
              <TextField id="outlined-basic" label="New Calories" variant="outlined" value={entry} onChange={changeHandler}
              /> &nbsp;&nbsp;
              <Button variant="outlined" type="submit"
              sx={{ p: 1.8 }}
              >Submit</Button>
            </form>
          </Box>
        </Modal>
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




















