import { useState } from 'react';
import ProductsListing from './components/ProductsListing';
import FilterPanel from './components/FilterPanel';
import './index.scss';

const ProductsCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='catalog'>
      <header className='catalog__header'>
        <div className='catalog__header__results'>
          <p>40 products found</p>{' '}
        </div>{' '}
        <button onClick={() => setIsOpen(true)}>Open Filters</button>
      </header>
      <div className='catalog__body'>
        <aside className='catalog__sidebar'>
          <FilterPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </aside>
        <main className='catalog__content'>
          <ProductsListing />
        </main>
      </div>
    </div>
  );
};

export default ProductsCatalog;
