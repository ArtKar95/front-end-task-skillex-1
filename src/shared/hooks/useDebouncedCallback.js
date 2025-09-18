import { useRef } from 'react';

const useDebouncedCallback = (callback, delay = 500) => {
  const timer = useRef();

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebouncedCallback;
