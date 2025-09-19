//!I wrote this function to simulate API calls
export const simulateFetch = async (delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));

export const filterProducts = (items = [], filters = {}) => {
  if (!items?.length) return [];

  const {
    search = '',
    categories = [],
    brands = [],
    priceRange,
    rating,
  } = filters ?? {};

  const lowerSearch = search.trim().toLowerCase();

  return items.filter((product) => {
    const {
      name = '',
      category,
      brand,
      price,
      rating: productRating,
    } = product;

    return (
      (!lowerSearch || name.toLowerCase().includes(lowerSearch)) &&
      (!categories.length || categories.includes(category)) &&
      (!brands.length || brands.includes(brand)) &&
      (!priceRange?.min && !priceRange?.max
        ? true
        : price >= (priceRange.min ?? price) &&
          price <= (priceRange.max ?? price)) &&
      (rating == null || productRating >= rating)
    );
  });
};

export const sortProducts = (products = [], sortOption = 'name-asc') => {
  const [key, order] = sortOption.split('-');

  const compare = (a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (key === 'name')
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);

    return order === 'asc' ? valA - valB : valB - valA;
  };

  return products.sort(compare);
};
