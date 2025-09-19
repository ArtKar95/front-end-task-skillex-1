import { useCallback, useEffect } from 'react';
import VirtualizedSelect from '@/shared/components/VirtualizedSelect';
import DebouncedInput from '@/shared/components/DebouncesInput';
import { useToast } from '@/shared/hooks/useToast';
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../productsAPI';
import PriceRangeSlider from './PriceRangeSlider';
import RatingFilter from './RatingFilter';
import './index.scss';

const FilterPanel = ({ filters, handleFiltersChange, isOpen, onClose }) => {
  const { showToast } = useToast();
  const { data: categoriesData = [], error: categoriesError } =
    useGetCategoriesQuery();
  const { data: brandsData = [], error: brandsError } = useGetBrandsQuery();
  const { search, categories, brands, priceRange, rating } = filters || {};

  //!Also we can create funtion and call inside API calls insted of, but we don't have real API calls
  useEffect(() => {
    if (categoriesError) {
      showToast(
        'error',
        categoriesError.message ??
          'Something went wrong while fetching categories list'
      );
    }
    if (brandsError) {
      showToast(
        'error',
        brandsError.message ?? 'Something went wrong while fetching brands list'
      );
    }
  }, [categoriesError, brandsError, showToast]);

  const onFiltersChange = useCallback(
    (key, value) => {
      handleFiltersChange({
        ...filters,
        [key]: value,
      });
    },
    [handleFiltersChange, filters]
  );

  return (
    <div
      className={`filter ${isOpen ? 'filter--open' : ''}`}
      aria-hidden={!isOpen}
      data-testid='filter-panel-root'
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
            onChange={(value) => onFiltersChange('search', value)}
            placeholder='Search products...'
          />

          <VirtualizedSelect
            data={categoriesData}
            multiple
            selected={categories || []}
            onChange={(value) => onFiltersChange('categories', value)}
            placeholder='Categories'
            height={200}
            itemHeight={40}
          />

          <VirtualizedSelect
            data={brandsData}
            multiple
            selected={brands || []}
            onChange={(value) => onFiltersChange('brands', value)}
            placeholder='Brands'
            height={200}
            itemHeight={40}
          />

          <PriceRangeSlider
            defaultRange={priceRange}
            onChange={(value) => onFiltersChange('priceRange', value)}
          />

          <RatingFilter
            rating={rating}
            onChange={(value) => onFiltersChange('rating', value)}
          />
        </div>
      </aside>
    </div>
  );
};

export default FilterPanel;
