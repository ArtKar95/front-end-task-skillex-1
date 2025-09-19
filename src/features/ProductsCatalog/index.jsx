import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '@/features/ProductsCatalog/productsAPI';
import { useToast } from '@/shared/hooks/useToast';
import ProductsListing from './components/ProductsListing';
import FilterPanel from './components/FilterPanel';
import { INITIAL_FILTERS, INITIAL_SORT_OPTION, PAGE_SIZE } from './constants';
import SortOptions from './components/SortOptions';
import './index.scss';

const ProductsCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState(INITIAL_SORT_OPTION);
  const [productsLimit, setProductsLimit] = useState(PAGE_SIZE);

  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    filters,
    limit: productsLimit,
    sortOption,
  });

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
          <p>{total} products found</p>
        </div>
        <SortOptions
          sortOption={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
        <button onClick={() => setIsOpen(true)}>Open Filters</button>
      </header>

      <div className='catalog__body'>
        <aside className='catalog__sidebar'>
          <FilterPanel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </aside>

        <main className='catalog__content'>
          <ProductsListing
            products={products}
            isLoading={isLoading}
            isFetching={isFetching}
            onLoadMore={() => setProductsLimit((prev) => prev + PAGE_SIZE)}
            total={total}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductsCatalog;
