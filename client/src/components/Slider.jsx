import { useState } from 'react';
import ReactSlider from 'react-slider';

export default function Slider({ min, max, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);

  function handleOnChange(currentValue) {
    setValue(currentValue);
    onChange(currentValue);
  }

  return (
    <div className="slider">
      <div className="slider__limits">
        <small>{min}</small>
        <small>{max}</small>
      </div>
      <ReactSlider
        className="slider-wp slider--large"
        trackClassName="slider__track"
        thumbClassName="slider__thumb"
        markClassName="slider__mark"
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        renderThumb={({ key, ...props }) =>
          <div key={key} {...props}>
            <div className="slider__thumb-value">
              {value}
            </div>
          </div>
        }
      />
    </div>
  );
}

