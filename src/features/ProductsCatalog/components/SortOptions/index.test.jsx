import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SORT_OPTIONS } from '../../constants';
import SortOptions from './index';

describe('SortOptions', () => {
  const mockHandleSortChange = vi.fn();

  it('renders label and select with all options', () => {
    render(<SortOptions handleSortChange={mockHandleSortChange} />);

    expect(screen.getByText('Sort by:')).toBeInTheDocument();

    const select = screen.getByTestId('sort-select');
    expect(select).toBeInTheDocument();

    SORT_OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });

    expect(select.value).toBe('name-asc');
  });

  it('calls handleSortChange on select change', () => {
    render(<SortOptions handleSortChange={mockHandleSortChange} />);

    const select = screen.getByTestId('sort-select');
    fireEvent.change(select, { target: { value: SORT_OPTIONS[1].value } });

    expect(mockHandleSortChange).toHaveBeenCalledWith(SORT_OPTIONS[1].value);
  });
});
