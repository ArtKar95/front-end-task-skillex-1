import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RatingFilter from './index';

describe('RatingFilter', () => {
  const mockOnChange = vi.fn();

  it('renders all rating options', () => {
    render(<RatingFilter rating={-1} onChange={mockOnChange} />);

    expect(screen.getByText('Customer Rating')).toBeInTheDocument();

    expect(screen.getByText('Any')).toBeInTheDocument();
    expect(screen.getByText('★★★★★')).toBeInTheDocument();
    expect(screen.getByText('★★★★☆')).toBeInTheDocument();
    expect(screen.getByText('★★★☆☆')).toBeInTheDocument();
    expect(screen.getByText('★★☆☆☆')).toBeInTheDocument();
    expect(screen.getByText('★☆☆☆☆')).toBeInTheDocument();
  });

  it('checks the correct radio button based on rating prop', () => {
    render(<RatingFilter rating={4} onChange={mockOnChange} />);

    const checkedInput = screen.getByDisplayValue('4');
    expect(checkedInput).toBeChecked();
  });
});
