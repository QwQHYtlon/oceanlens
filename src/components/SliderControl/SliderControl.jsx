import { useId } from 'react';
import './SliderControl.css';

const SliderControl = ({
  label,
  value,
  min,
  max,
  unit = '',
  step = 1,
  onChange,
  color = '#00f5d4',
}) => {
  const inputId = useId();
  const percentage = ((value - min) / (max - min)) * 100;
  const valueText = `${value}${unit}`;

  return (
    <div className="slider-control">
      <div className="slider-control__header">
        <label className="slider-control__label" htmlFor={inputId}>
          {label}
        </label>
        <output className="slider-control__value" htmlFor={inputId} aria-live="off">
          {valueText}
        </output>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="slider-control__input"
        aria-valuetext={valueText}
        style={{
          '--slider-color': color,
          '--slider-percentage': `${percentage}%`,
        }}
      />
      <div className="slider-control__scale" aria-hidden="true">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default SliderControl;
