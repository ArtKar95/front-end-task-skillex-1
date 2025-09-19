import { render, screen } from '@testing-library/react';
import ProductsSkeleton from './index';
import { describe, expect, it } from 'vitest';

describe('ProductsSkeleton', () => {
  it('renders 8 skeleton items', () => {
    render(<ProductsSkeleton />);

    const skeletonItems = screen.getAllByClassName
      ? screen.getAllByClassName('products-skeleton')
      : document.getElementsByClassName('products-skeleton');

    expect(skeletonItems.length).toBe(8);
  });
});
