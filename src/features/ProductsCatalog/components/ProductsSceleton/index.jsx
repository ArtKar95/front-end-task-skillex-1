import './index.scss';

const ProductsSkeleton = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <div className='products-skeleton' key={index}>
      <div className='products-skeleton-img' />
      <div className='products-skeleton-text' />
      <div className='products-skeleton-text products-skeleton-text--short' />
    </div>
  ));
};

export default ProductsSkeleton;
