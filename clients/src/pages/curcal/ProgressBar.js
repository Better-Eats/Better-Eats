import React from "react";
import './curcal.css';

export default function ProgressBar(props) {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    height: '100%',
    maxWidth: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className='containerStyles'>
      <div style={fillerStyles}>
        <span className='labelStyles'>
          {`${completed}%`}
        </span>
      </div>
    </div>
  );
};