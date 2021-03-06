import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './curcal.css';
import { auth } from '../../firebase-config.js';
import Piechart from './Piechart.js';
import ProgressBar from './ProgressBar.js';
import Box from '@mui/material/Box';
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
  const [topFive, setTopFive] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const pieChartData = [
    { name: 'Total Calories', value: totalCalories },
    { name: 'Current Calories', value: currentCalories },
  ];

  const getItems = async (event) => {
    event.preventDefault();
    try {
      const top5 = await axios.get('/cal', { params: { query: event.target[0].value, dateType: 'Branded'}});
      setTopFive(top5.data.foods);
    } catch(err) {
      console.log(err);
    }
  };

  const addItem = async (fdcid) => {
    handleClose();
    const date = new Date()
    date.setHours(0, 0, 0, 0);
    const params = {
      uid: auth.currentUser.uid,
      fdcid: fdcid,
      date: date.toISOString(),
      currentTotal: {
        calories: currentCalories,
        carbohydrates: currentCarbs,
        fat: currentFat,
        protein: currentProtein
      }
    }
    try {
      await axios.post('/cal', params)
      const params2 = {params: {id: auth.currentUser.uid, date: date.toISOString()}}
      const updatedNutrients = await axios.get('/users/info', params2);
      setCurrentCalories(updatedNutrients.data[0].totalcal);
      setCurrentCarbs(updatedNutrients.data[0].totalCarbs);
      setCurrentFat(updatedNutrients.data[0].totalFat);
      setCurrentProtein(updatedNutrients.data[0].totalProtein);
    } catch(err) {
      console.log(err);
    }
  };

  const addCustomItem = async (e) => {
    e.preventDefault();
    handleClose();
    const date = new Date()
    date.setHours(0, 0, 0, 0);
    const params = {
      uid: auth.currentUser.uid,
      date: date.toISOString(),
      totalCal: currentCalories + Number(e.target[2].value),
      totalCarbs: currentCarbs + Number(e.target[4].value),
      totalFat: currentFat + Number(e.target[6].value),
      totalProtein: currentProtein + Number(e.target[8].value),
      foodName: e.target[0].value,
      calories: Number(e.target[2].value),
      carbohydrates: Number(e.target[4].value),
      fat: Number(e.target[6].value),
      protein: Number(e.target[8].value)
    };
    try {
      await axios.post('/cal/customitem', params)
      const params2 = {params: {id: auth.currentUser.uid, date: date.toISOString()}}
      const updatedNutrients = await axios.get('/users/info', params2);
      setCurrentCalories(updatedNutrients.data[0].totalcal);
      setCurrentCarbs(updatedNutrients.data[0].totalCarbs);
      setCurrentFat(updatedNutrients.data[0].totalFat);
      setCurrentProtein(updatedNutrients.data[0].totalProtein);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTotalCal = async() => {
      try {
        const date = new Date()
        date.setHours(0, 0, 0, 0);
        const params = {params: {id: auth.currentUser?.uid, date: date.toISOString()}}
        const totalCalories = await axios.get('/users', params);
        const currentInfo = await axios.get('/users/info', params);
        setTotalCalories(totalCalories.data[0].goal);
        // setTotalCarbs(currentCarbs);
        // setTotalFat(currentFat);
        // setTotalProtein(currentProtein);
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
           <div className='bartext2'>
            {Math.round(totalCarbs - currentCarbs)}g left
          </div>
        </div>
        <div className='fat'>
          <div className='bartext'>
            Fat <span className='g'>(g)</span>
          </div>
          <ProgressBar
            bgcolor={((currentFat / totalFat ) * 100) < 100 ? "#B7CE63" : "#DA2C38"}
            completed={Math.round((currentFat / totalFat ) * 100)}
          />
           <div className='bartext2'>
            {Math.round(totalFat - currentFat)}g left
          </div>
        </div>
        <div className='protein'>
          <div className='bartext'>
            Protein <span className='g'>(g)</span>
          </div>
          <ProgressBar
           bgcolor={((currentProtein / totalProtein ) * 100) < 100 ? "#B7CE63" : "#DA2C38"}
           completed={Math.round((currentProtein / totalProtein ) * 100)}
          />
           <div className='bartext2'>
            {Math.round(totalProtein - currentProtein)}g left
          </div>
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
              width: 800,
              height: 500,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={getItems}>
              <TextField
                id="standard-search"
                label="Search field"
                type="search"
                variant="standard"
                fullWidth
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
            <div className="searchResults">
              <h2> Food Item</h2>
              <h2> Calories </h2>
              <h2> Carbs </h2>
              <h2> Fat </h2>
              <h2> Protein </h2>
            </div>
            <div>
              {topFive.map((item, index) => {
                const nt = {}
                nt.fdcId = item.fdcId;
                item.foodNutrients.map(nutrient => {
                  if (nutrient.nutrientName === "Energy") {
                    if (nutrient.unitName.toLowerCase() ==='kj') {
                      nt.calories = Math.round(nutrient.value / 4.18);
                    } else {
                      nt.calories = nutrient.value;
                    }
                  }
                  if (nutrient.nutrientName === "Carbohydrate, by difference"){
                    nt.carbs = nutrient.value;
                  }
                  if (nutrient.nutrientName === "Total lipid (fat)"){
                    nt.fat = nutrient.value;
                  }
                  if (nutrient.nutrientName === "Protein"){
                    nt.protein = nutrient.value;
                  }

                })
                return (
                  <div className='searchResults' key={index}
                    onClick={() => addItem(nt.fdcId)}
                  >
                    <h3> {item.description} </h3>
                    <h3> {nt.calories} KCAL </h3>
                    <h3> {nt.carbs} g </h3>
                    <h3> {nt.fat} g </h3>
                    <h3> {nt.protein} g </h3>
                  </div>
                )
              })}
            </div>
            <div className='addcustom'>
              <h3>Add a Custom Item</h3>
              <form className='customform' onSubmit={addCustomItem}>
              <div>
              <TextField
                id="name"
                label="Food Name"
                size="small"
                sx={{m:1, width: '15ch'}}
              />
              <TextField
                id="calories"
                label="Total Calories"
                size="small"
                sx={{m:1, width: '15ch'}}
              />
              <TextField
                id="Carbs"
                label="Total Carbs (g)"
                size="small"
                sx={{m:1, width: '15ch'}}
              />
              <TextField
                id="Fat"
                label="Total Fat (g)"
                size="small"
                sx={{m:1, width: '15ch'}}
              />
              <TextField
                id="Protein"
                label="Total Protein (g)"
                size="small"
                sx={{m:1, width: '15ch'}}
              />
              </div>
              <button
                type='submit'
                className='addbtn2'
              >
                Add New Food
              </button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

