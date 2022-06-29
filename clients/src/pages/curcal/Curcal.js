import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './curcal.css';
import { auth } from '../../firebase-config.js';
import Piechart from './Piechart.js';
import ProgressBar from './ProgressBar.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function Curcal(){
  const [totalCalories, setTotalCalories] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(300);
  const [currentCarbs, setCurrentCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(50);
  const [currentFat, setCurrentFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(70);
  const [currentProtein, setCurrentProtein] = useState(0);
  const [food, setFood] = useState('');
  const [topFive, setTopFive] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const pieChartData = [
    { name: 'Total Calories', value: totalCalories },
    { name: 'Current Calories', value: currentCalories },
  ];

  const addItem = (event) => {
    event.preventDefault();
    axios.get('/cal', {params: {query: food, dateType: 'Branded'}})
      .then((top5) => {
        console.log(top5.data.foods);
        setTopFive(top5.data.foods)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    const getTotalCal = async() => {
      try {
        const params = {params: {id: '1321321', date: '6/27/2022'}} // change this to firebase auth
        const totalCalories = await axios.get('/users', params);
        const currentInfo = await axios.get('/users/info', params);
        setTotalCalories(totalCalories.data[0].goal);
        setCurrentCalories(currentInfo.data[0].totalcal);
        setCurrentCarbs(currentInfo.data[0].totalCarbs);
        setCurrentFat(currentInfo.data[0].totalFat);
        setCurrentProtein(currentInfo.data[0].totalProtein);
      } catch(err) {
        console.log(err);
      }
    }
    getTotalCal();
  }, [currentCalories]);

  return (
    <div className='curcal'>
      <button className='test'
      onClick={() => console.log(auth.currentUser)}>
        Test
      </button>
      <Piechart
        data={pieChartData}
        total={totalCalories}
        current={currentCalories}
      />
      <div className='bar'>
        <div className='carbs'>
          <div className='bartext'>
            Carbs <span className='g'>(g)</span>
          </div>
          <ProgressBar
            bgcolor={((currentCarbs / totalCarbs ) * 100) < 100 ? "#B7CE63" : "#DA2C38"}
            completed={Math.round((currentCarbs / totalCarbs ) * 100)}
          />
        </div>
        <div className='fat'>
          <div className='bartext'>
            Fat <span className='g'>(g)</span>
          </div>
          <ProgressBar
            bgcolor={((currentFat / totalFat ) * 100) < 100 ? "#B7CE63" : "#DA2C38"}
            completed={Math.round((currentFat / totalFat ) * 100)}
          />
        </div>
        <div className='protein'>
          <div className='bartext'>
            Protein <span className='g'>(g)</span>
          </div>
          <ProgressBar
           bgcolor={((currentProtein / totalProtein ) * 100) < 100 ? "#B7CE63" : "#DA2C38"}
           completed={Math.round((currentProtein / totalProtein ) * 100)}
          />
        </div>
      </div>
      <div className='add'>
        <button
          className='addbtn'
          onClick={handleOpen}
        >
          Add New Food
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter to search for food:
          </Typography>
          <form onSubmit={addItem}>
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
              fullWidth
              onInput={(e) => setFood(e.target.value)}
            />
            <Button
              variant="text"
              endIcon={<SearchIcon/>}
              type='submit'
              sx={{py: 2}}
            >
              Search
            </Button>
          </form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        </Modal>
      </div>
    </div>
  );
}

