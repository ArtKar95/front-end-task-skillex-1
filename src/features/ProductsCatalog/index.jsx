import { useState, useEffect, useCallback } from 'react';
import { useGetProductsQuery } from '@/features/ProductsCatalog/productsAPI';
import { useToast } from '@/shared/hooks/useToast';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import ProductsListing from './components/ProductsListing';
import FilterPanel from './components/FilterPanel';
import { INITIAL_FILTERS, INITIAL_SORT_OPTION, PAGE_SIZE } from './constants';
import SortOptions from './components/SortOptions';
import './index.scss';

const STORAGE_KEY = 'productsCatalogPreferences';

const ProductsCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const [preferences, setPreferences] = useLocalStorage(STORAGE_KEY, {
    filters: INITIAL_FILTERS,
    sortOption: INITIAL_SORT_OPTION,
    limit: PAGE_SIZE,
  });

  const { filters, sortOption, limit: productsLimit } = preferences;

  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    filters,
    limit: productsLimit,
    sortOption,
  });

  const handlePreferencesChange = useCallback(
    (key, value) => {
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setPreferences]
  );

  const { products = [], total = 0 } = data || {};

  useEffect(() => {
    if (error) {
      showToast(
        'error',
        error.message ?? 'Something went wrong while fetching poducts list'
      );
    }
  }, [error, showToast]);

  return (
    <div className='catalog'>
      <header className='catalog__header'>
        <div className='catalog__header__results'>
          <p data-testid='products-count'>
            {total} {total <= 1 ? 'product' : 'products'} found
          </p>
        </div>
        <SortOptions
          sortOption={sortOption}
          handleSortChange={(option) =>
            handlePreferencesChange('sortOption', option)
          }
        />
        <button onClick={() => setIsOpen(true)}>Open Filters</button>
      </header>

      <div className='catalog__body'>
        <aside className='catalog__sidebar'>
          <FilterPanel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            filters={filters}
            handleFiltersChange={(newFilters) =>
              handlePreferencesChange('filters', newFilters)
            }
          />
        </aside>

        <main className='catalog__content'>
          <ProductsListing
            products={products}
            isLoading={isLoading}
            isFetching={isFetching}
            handleLoadMore={() =>
              handlePreferencesChange('limit', productsLimit + PAGE_SIZE)
            }
            total={total}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductsCatalog;
