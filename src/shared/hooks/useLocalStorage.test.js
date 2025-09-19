import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
  const KEY = 'test-key';
  const INITIAL_VALUE = { sortOption: 'name-asc' };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));
    const [preferences] = result.current;

    expect(preferences).toEqual(INITIAL_VALUE);
  });

  it('initializes with value from localStorage if present', () => {
    const storedValue = { sortOption: 'name-desc' };
    localStorage.setItem(KEY, JSON.stringify(storedValue));

    const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));
    const [preferences] = result.current;

    expect(preferences).toEqual(storedValue);
  });

  it('updates state and localStorage when setPreferences is called', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));
    const [, setPreferences] = result.current;

    act(() => {
      setPreferences({ sortOption: 'name-desc' });
    });

    const [preferences] = result.current;
    expect(preferences).toEqual({ sortOption: 'name-desc' });
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual({
      sortOption: 'name-desc',
    });
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, { count: 0 }));
    const [, setPreferences] = result.current;

    act(() => {
      setPreferences((prev) => ({ count: prev.count + 1 }));
    });

    const [preferences] = result.current;
    expect(preferences).toEqual({ count: 1 });
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual({ count: 1 });
  });

  it('clears preferences and removes key from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));
    const [, , clearPreferences] = result.current;

    act(() => {
      clearPreferences();
    });

    const [preferences] = result.current;
    expect(preferences).toEqual(INITIAL_VALUE);
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
