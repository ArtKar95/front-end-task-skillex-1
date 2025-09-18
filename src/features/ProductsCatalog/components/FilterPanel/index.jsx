import { useCallback } from 'react';
import VirtualizedSelect from '@/shared/components/VirtualizedSelect';
import DebouncedInput from '@/shared/components/DebouncesInput';
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../productsAPI';
import PriceRangeSlider from './PriceRangeSlider';
import RatingFilter from './RatingFilter';
import './index.scss';

const FilterPanel = ({ filters, setFilters, isOpen, onClose }) => {
  const { data: categoriesData = [] } = useGetCategoriesQuery();
  const { data: brandsData = [] } = useGetBrandsQuery();
  const { search, categories, brands, priceRange, rating } = filters || {};

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFilters]
  );

  return (
    <div
      className={`filter ${isOpen ? 'filter--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className='filter__backdrop' onClick={onClose} />
      <aside className='filter__panel'>
        <div className='filter__header'>
          <h2 className='filter__title'>Filters</h2>
          <button className='filter__close-btn' onClick={onClose}>
            ✕
          </button>
        </div>

        <div className='filter__content'>
          <DebouncedInput
            defaultValue={search}
            onChange={(value) => handleFilterChange('search', value)}
            placeholder='Search products...'
          />

          <VirtualizedSelect
            data={categoriesData}
            multiple
            selected={categories || []}
            onChange={(value) => handleFilterChange('categories', value)}
            placeholder='Categories'
            height={200}
            itemHeight={40}
          />

          <VirtualizedSelect
            data={brandsData}
            multiple
            selected={brands || []}
            onChange={(value) => handleFilterChange('brands', value)}
            placeholder='Brands'
            height={200}
            itemHeight={40}
          />

          <PriceRangeSlider
            defaultRange={priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
          />

          <RatingFilter
            selected={rating || null}
            onChange={(value) => handleFilterChange('rating', value)}
          />
        </div>
      </aside>
    </div>
  );
};

export default FilterPanel;
