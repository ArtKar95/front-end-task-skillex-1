import { useState, useEffect, useMemo } from 'react';
import useDebouncedCallback from '@/shared/hooks/useDebouncedCallback';
import { useGetPriceRangeQuery } from '@/features/ProductsCatalog/productsAPI';
import './index.scss';

const PriceRangeSlider = ({ defaultRange, onChange }) => {
  const { data: priceRange = null } = useGetPriceRangeQuery();
  const { min, max } = priceRange || {};

  const [range, setRange] = useState(defaultRange || { min: 0, max: 0 });

  useEffect(() => {
    if (priceRange && !defaultRange) {
      setRange({ min: priceRange.min, max: priceRange.max });
    }
  }, [priceRange, defaultRange]);

  const debouncedOnChange = useDebouncedCallback(onChange, 300);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), range.max - 1);
    const updated = { ...range, min: value };
    setRange(updated);
    debouncedOnChange(updated);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), range.min + 1);
    const updated = { ...range, max: value };
    setRange(updated);
    debouncedOnChange(updated);
  };

  const minPercent = useMemo(
    () => ((range.min - min) / (max - min)) * 100,
    [range.min, min, max]
  );

  const maxPercent = useMemo(
    () => ((range.max - min) / (max - min)) * 100,
    [range.max, min, max]
  );

  if (!priceRange) return null;

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
          value={range.min}
          onChange={handleMinChange}
          className='price-range__slider price-range__slider--min'
        />
        <input
          type='range'
          min={min}
          max={max}
          value={range.max}
          onChange={handleMaxChange}
          className='price-range__slider price-range__slider--max'
        />
      </div>

      <div className='price-range__values'>
        <span>${range.min}</span>
        <span>${range.max}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
