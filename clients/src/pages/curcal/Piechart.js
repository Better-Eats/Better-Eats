import React from 'react';
import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './curcal.css';

const COLORS = ['#B7CE63', '#C8C6C6'];

export default class Piechart extends PureComponent {
  constructor({props}) {
    super(props);
  }

  render() {
    return (
      <div className='piecontainer'>
        <div className='kcal'>
          {this.props.total - this.props.current}
        </div>
        <div className='text'>
          kcal left
        </div>
        <PieChart className='piechart' width={444} height={444} onMouseEnter={this.onPieEnter}>
          <Pie
            data={this.props.data}
            cx={217}
            cy={217}
            innerRadius={190}
            outerRadius={220}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            strokeWidth={2.5}
          >
            {this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

