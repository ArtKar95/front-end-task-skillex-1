import { useGetProductsQuery } from '@/features/ProductsCatalog/productsAPI';
import ProductCard from '../ProductCard';
import ProductsSkeleton from '../ProductsSceleton';
import './index.scss';

const ProductsListing = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <div className='products'>
      <div className='products__grid'>
        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsListing;
