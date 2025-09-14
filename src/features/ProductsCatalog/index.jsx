import ProductCard from './components/ProductCard';

const ProductsCatalog = () => {
  return (
    <div>
      <ProductCard
        product={{
          id: 1,
          name: 'Wireless Headphones',
          category: 'Electronics',
          brand: 'Brand A',
          price: 99.99,
          rating: 1.6,
          imageUrl:
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        }}
      />
    </div>
  );
};

export default ProductsCatalog;
