import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from './index';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFoundPage', () => {
  it('renders 404 message and button', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('calls navigate("/") when Home Page button is clicked', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<NotFoundPage />);

    fireEvent.click(screen.getByText('Home Page'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
