import { useState, useMemo } from 'react';
import { useGetProductsQuery } from '@/features/ProductsCatalog/productsAPI';
import ProductCard from '../ProductCard';
import ProductsSkeleton from '../ProductsSceleton';
import './index.scss';

const PAGE_SIZE = 24;

const ProductsListing = () => {
  //! Of cours better to do with real API query params and pagination and filtring and sorting
  //! I just simulating it this way for the task
  const [limit, setLimit] = useState(PAGE_SIZE);

  const { data, isFetching, isLoading } = useGetProductsQuery({ limit });
  const { products = [], total = 0 } = data || {};

  const handleLoadMore = () => {
    setLimit((prev) => prev + PAGE_SIZE);
  };

  const hasMore = useMemo(() => {
    return products?.length < total;
  }, [products, total]);

  return (
    <div className='products'>
      <div className='products__grid'>
        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!hasMore ? (
        <div className='products__no-more'>
          <p>🎉 You've reached the end of the list!</p>
        </div>
      ) : (
        <div className='products__load-more'>
          <button onClick={handleLoadMore} disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsListing;
