import React, { useState } from 'react';
import './index.scss';

const RATING_OPTIONS = [
  { value: '', label: 'Any' },
  { value: 5, label: '★★★★★' },
  { value: 4, label: '★★★★☆' },
  { value: 3, label: '★★★☆☆' },
  { value: 2, label: '★★☆☆☆' },
  { value: 1, label: '★☆☆☆☆' },
];

const RatingFilter = ({ onChange }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (onChange) onChange(value ? Number(value) : null);
  };

  return (
    <div className='rating-filter'>
      <label className='rating-filter__label'>Customer Rating</label>
      <div className='rating-filter__list'>
        {RATING_OPTIONS.map((opt) => (
          <label key={opt.value || 'any'} className='rating-filter__option'>
            <input
              type='radio'
              name='rating'
              value={opt.value}
              checked={selected === String(opt.value)}
              onChange={handleChange}
            />
            <span className='rating-filter__text'>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
