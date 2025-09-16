/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import VirtualizedSelect from '@/shared/components/VirtualizedSelect';
import './index.scss';

const options = [
  'Apple',
  'Banana',
  'Orange',
  'Grape',
  'Mango',
  'Pineapple',
  'Strawberry',
  'Blueberry',
  'Watermelon',
  'Kiwi',
];

const FilterPanel = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMultiChange = useCallback(setSelectedItems, []);
  const handleSingleChange = useCallback(setSelectedItem, []);

  return (
    <div
      className={`filter ${isOpen ? 'filter--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className='filter__backdrop' onClick={onClose} />
      <aside className='filter__panel'>
        <div className='filter__header'>
          <h2 className='filter__title'>Filters</h2>
          <button className='filter__close-btn' onClick={onClose}>
            ✕
          </button>
        </div>
        <div className='filter__content'>
          <VirtualizedSelect
            data={options}
            multiple
            selected={selectedItems}
            onChange={handleMultiChange}
            placeholder='Select fruits...'
            height={200}
            itemHeight={40}
          />
          <VirtualizedSelect
            data={options}
            selected={selectedItem}
            onChange={handleSingleChange}
            placeholder='Select single select...'
            height={200}
            itemHeight={40}
          />
        </div>
      </aside>
    </div>
  );
};

export default FilterPanel;
