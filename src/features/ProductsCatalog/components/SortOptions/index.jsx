import { SORT_OPTIONS } from '../../constants';
import './index.scss';

const SortOptions = ({ sortOption = 'name-asc', handleSortChange }) => {
  return (
    <div className='sort-options'>
      <label htmlFor='sort-select' className='sort-label'>
        Sort by:
      </label>
      <select
        id='sort-select'
        value={sortOption}
        onChange={(e) => handleSortChange(e.target.value)}
        className='sort-select'
        data-testid='sort-select'
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
