import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DebouncedInput from './index';

describe('DebouncedInput', () => {
  it('renders input with default value and placeholder', () => {
    render(<DebouncedInput defaultValue='test' placeholder='Search...' />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
  });

  it('updates input value and calls onChange after debounce', async () => {
    const mockOnChange = vi.fn();
    render(<DebouncedInput onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(input.value).toBe('hello');

    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalledWith('hello');
      },
      { timeout: 600 }
    );
  });
});
