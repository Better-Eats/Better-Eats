import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HistoryList = ({item}) => {

  return (
    <>
    <div className='date'>{item.date}</div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight:"bold", fontSize: 16 }}> Food Names</TableCell>
            <TableCell align="right" sx={{ fontWeight:"bold", fontSize: 16 }}>Calories</TableCell>
            <TableCell align="right" sx={{ fontWeight:"bold", fontSize: 16 }}>Carbs&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight:"bold", fontSize: 16 }}>Fat&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight:"bold", fontSize: 16 }}>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.items.map((food, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {food.foodName.slice(0, 1) + food.foodName.slice(1).toLowerCase()}
              </TableCell>
              <TableCell align="right">{food.calories}</TableCell>
              <TableCell align="right">{food.carbohydrates}</TableCell>
              <TableCell align="right">{food.fat}</TableCell>
              <TableCell align="right">{food.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
};


export default HistoryList;