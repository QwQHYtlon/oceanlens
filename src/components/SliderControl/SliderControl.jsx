import React from 'react';
import './SliderControl.css';

const SliderControl = ({ label, value, min, max, unit, onChange, color = '#00f5d4' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="slider-control">
      <div className="slider-control__header">
        <label className="slider-control__label">{label}</label>
        <span className="slider-control__value">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-control__input"
        style={{ 
          '--slider-color': color,
          '--slider-percentage': `${percentage}%`
        }}
      />
    </div>
  );
};

export default SliderControl;
