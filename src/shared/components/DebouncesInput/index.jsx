import { useState } from 'react';
import useDebouncedCallback from '@/shared/hooks/useDebouncedCallback';
import './index.scss';

const DebouncedInput = ({
  defaultValue = '',
  onChange,
  placeholder = 'Search...',
}) => {
  const [value, setValue] = useState(defaultValue);

  const debouncedOnChange = useDebouncedCallback(onChange, 500);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    debouncedOnChange(val);
  };

  return (
    <div className='debounced-input'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DebouncedInput;
