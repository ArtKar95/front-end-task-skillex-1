import { useState } from 'react';
import { useGetProductsQuery } from '@/features/ProductsCatalog/productsAPI';
import ProductsListing from './components/ProductsListing';
import FilterPanel from './components/FilterPanel';
import { INITIAL_FILTERS, PAGE_SIZE } from './constants';
import './index.scss';

const ProductsCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const { data, isLoading, isFetching } = useGetProductsQuery(filters);

  const { products = [], total = 0 } = data || {};

  const handleLoadMore = () => {
    setFilters((prev) => ({ ...prev, limit: prev.limit + PAGE_SIZE }));
  };

  return (
    <div className='catalog'>
      <header className='catalog__header'>
        <div className='catalog__header__results'>
          <p>{total} products found</p>
        </div>
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
            onLoadMore={handleLoadMore}
            total={total}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductsCatalog;
