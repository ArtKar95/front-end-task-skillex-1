import { useMemo } from 'react';
import ProductCard from '../ProductCard';
import ProductsSkeleton from '../ProductsSceleton';
import './index.scss';

const ProductsListing = ({
  products,
  isLoading,
  isFetching,
  handleLoadMore,
  total,
}) => {
  const hasMore = useMemo(() => products.length < total, [products, total]);

  return (
    <div className='products'>
      <div className='products__grid'>
        {isLoading || isFetching ? (
          <ProductsSkeleton />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!hasMore ? (
        <div className='products__no-more'>
          {!products.length ? (
            <p>No products found.</p>
          ) : (
            <p>🎉 You've reached the end of the list!</p>
          )}
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
