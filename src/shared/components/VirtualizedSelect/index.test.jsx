import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VirtualizedSelect from './index';

describe('VirtualizedSelect', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  it('renders button with placeholder when no selection', () => {
    render(<VirtualizedSelect data={options} multiple={true} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('opens and closes dropdown on button click', () => {
    render(<VirtualizedSelect data={options} multiple={true} />);
    const button = screen.getByRole('button');

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('selects and deselects options in multiple mode', () => {
    const handleChange = vi.fn();
    render(
      <VirtualizedSelect
        data={options}
        multiple={true}
        selected={[]}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith(['Option 1']);

    handleChange.mockClear();
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith(['Option 2']);
  });

  it('filters options when typing in search input (multiple mode)', () => {
    render(<VirtualizedSelect data={options} multiple={true} selected={[]} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '2' } });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('shows "No options found" when data is empty', () => {
    render(<VirtualizedSelect data={[]} multiple={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('clears selection when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <VirtualizedSelect
        data={options}
        multiple={true}
        selected={['Option 1']}
        onChange={handleChange}
      />
    );

    const clearBtn = screen.getByText('×');
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('handles single selection mode', () => {
    const handleChange = vi.fn();
    render(
      <VirtualizedSelect
        data={options}
        multiple={false}
        selected={null}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    fireEvent.click(screen.getByText('Option 1'));

    expect(handleChange).toHaveBeenCalledWith('Option 1');

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
