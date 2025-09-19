export const PAGE_SIZE = 24;

export const INITIAL_FILTERS = {
  categories: [],
  brands: [],
  search: '',
  priceRange: null,
  rating: null,
};

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
  { value: 'popularity-desc', label: 'Popularity: High to Low' },
  { value: 'popularity-asc', label: 'Popularity: Low to High' },
];

export const INITIAL_SORT_OPTION = 'name-asc';
