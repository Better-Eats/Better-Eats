import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './curcal.css'
import { auth } from '../../firebase-config.js';
import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

<<<<<<< HEAD
export default function Curcal(){

  return (
    <div className ='curcal'>
      current cal page
    </div>
=======
const data = [
  { name: 'Group A', value: 2500 },
  { name: 'Group B', value: 300 },
];
const COLORS = ['#B7CE63', '#C8C6C6'];
>>>>>>> ce0a3e0fcd698d83494cfa1d55dce6d62b9e107a

export default class Curcal extends PureComponent {

  // useEffect(() => {
  //   axios.get('')
  // });

  render() {
    return (
      <div className='curcal'>
        <button className='test'
        onClick={() => console.log(auth.currentUser)}>
          Test
        </button>
        <div className='container'>
          <div className='kcal'>
            2200
          </div>
          <div className='text'>
            kcal left
          </div>
          <PieChart className='piechart' width={444} height={444} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx={217}
              cy={217}
              innerRadius={190}
              outerRadius={220}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              strokeWidth={2.5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    );
  }
}

