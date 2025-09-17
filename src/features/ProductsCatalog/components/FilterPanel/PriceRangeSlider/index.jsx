import React, { useState, useEffect } from 'react';
import useDebounce from '@/shared/hooks/useDebounce';
import './index.scss';

const PriceRangeSlider = ({ min = 0, max = 1000, onChange }) => {
  const [range, setRange] = useState({ minValue: min, maxValue: max });

  const debouncedRange = useDebounce(range, 300);

  useEffect(() => {
    if (onChange) onChange(debouncedRange);
  }, [debouncedRange, onChange]);

  const minPercent = ((range.minValue - min) / (max - min)) * 100;
  const maxPercent = ((range.maxValue - min) / (max - min)) * 100;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), range.maxValue - 1);
    setRange({ ...range, minValue: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), range.minValue + 1);
    setRange({ ...range, maxValue: value });
  };

  return (
    <div className='price-range'>
      <label className='price-range__label'>Price Range</label>
      <div
        className='price-range__inputs'
        style={{
          '--minPercent': `${minPercent}%`,
          '--maxPercent': `${maxPercent}%`,
        }}
      >
        <input
          type='range'
          min={min}
          max={max}
          value={range.minValue}
          onChange={handleMinChange}
          className='price-range__slider price-range__slider--min'
        />
        <input
          type='range'
          min={min}
          max={max}
          value={range.maxValue}
          onChange={handleMaxChange}
          className='price-range__slider price-range__slider--max'
        />
      </div>
      <div className='price-range__values'>
        <span>${range.minValue}</span>
        <span>${range.maxValue}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
