import { useState, useMemo, useRef, useEffect } from 'react';
import './index.scss';

const VirtualizedSelect = ({
  data = [],
  selected,
  onChange,
  multiple = false,
  height = 240,
  itemHeight = 40,
  placeholder = 'Select option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const buttonRef = useRef(null);
  const scrollRef = useRef(null);
  const searchRef = useRef(null);
  const [searchHeight, setSearchHeight] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 0 });
  const [dropdownPos, setDropdownPos] = useState({});

  useEffect(() => {
    const sh = searchRef.current?.offsetHeight || 0;
    setSearchHeight(sh);
    const visibleCount = Math.ceil((height - sh) / itemHeight);
    setRange({ start: 0, end: Math.min(data.length, visibleCount + 3) });
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen, filter, data.length, height, itemHeight]);

  useEffect(() => {
    const handleClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (!isOpen) setFilter('');
    if (!isOpen || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!multiple || !filter.trim()) return data;
    const q = filter.toLowerCase();
    return data.filter((item) => item.toLowerCase().includes(q));
  }, [data, filter, multiple]);

  const total = filtered.length;
  const offsetY = range.start * itemHeight;

  const toggleOption = (item) => {
    if (multiple)
      onChange?.(
        selected.includes(item)
          ? selected.filter((i) => i !== item)
          : [...selected, item]
      );
    else {
      onChange?.(item);
      setIsOpen(false);
    }
  };

  const clearAll = () => onChange?.(multiple ? [] : null) || setIsOpen(false);

  const buttonLabel = multiple
    ? !selected.length
      ? placeholder
      : selected.length <= 3
      ? selected.join(', ')
      : `${selected.length} selected`
    : selected ?? placeholder;

  const onScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    setRange({
      start: Math.max(0, Math.floor(scrollTop / itemHeight) - 3),
      end: Math.min(
        total,
        Math.ceil((scrollTop + height - searchHeight) / itemHeight) + 3
      ),
    });
  };

  const visibleSlice = filtered.slice(range.start, range.end);

  return (
    <div className='virtual-select'>
      <button
        ref={buttonRef}
        className='virtual-select__button'
        onClick={(e) =>
          !e.target.closest('.virtual-select__button-clear') &&
          setIsOpen((o) => !o)
        }
      >
        <span className='virtual-select__button-label'>{buttonLabel}</span>
        {(multiple ? selected.length : selected) ? (
          <span className='virtual-select__button-clear' onClick={clearAll}>
            ×
          </span>
        ) : (
          <span className='virtual-select__button-icon'>▾</span>
        )}
      </button>

      {isOpen && (
        <div
          className='virtual-select__dropdown'
          style={{ position: 'fixed', ...dropdownPos, maxHeight: height }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {multiple && (
            <div ref={searchRef} className='virtual-select__search'>
              <input
                className='virtual-select__input'
                placeholder='Search...'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          )}

          <div
            ref={scrollRef}
            className='virtual-select__list'
            style={{ height: height - searchHeight }}
            onScroll={onScroll}
          >
            {total === 0 ? (
              <div className='virtual-select__no-options'>No options found</div>
            ) : (
              <div style={{ height: total * itemHeight, position: 'relative' }}>
                <div
                  className='virtual-select__slice'
                  style={{ transform: `translateY(${offsetY}px)` }}
                >
                  {visibleSlice.map((item, idx) => {
                    const isSelected = multiple
                      ? selected.includes(item)
                      : selected === item;
                    return (
                      <div
                        key={`${range.start + idx}-${item}`}
                        className={`virtual-select__item ${
                          isSelected ? 'is-selected' : ''
                        }`}
                        onClick={() => toggleOption(item)}
                      >
                        {multiple && (
                          <input
                            type='checkbox'
                            checked={isSelected}
                            readOnly
                            className='virtual-select__checkbox'
                          />
                        )}
                        <span className='virtual-select__label'>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualizedSelect;
