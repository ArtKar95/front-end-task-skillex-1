import { useState, useEffect } from 'react';
import useDebounce from '@/shared/hooks/useDebounce';
import './index.scss';

const DebouncedInput = ({ onChange, placeholder = 'Search...' }) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch, onChange]);

  return (
    <div className='debounced-input'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DebouncedInput;
