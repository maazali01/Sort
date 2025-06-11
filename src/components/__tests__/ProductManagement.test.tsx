import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductManagement from '../ProductManagement';

describe('ProductManagement', () => {
  it('renders summary cards', () => {
    render(<ProductManagement />);
    expect(screen.getByText(/Total Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Stock Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventory Value/i)).toBeInTheDocument();
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
  });

  it('filters products by search', () => {
    render(<ProductManagement />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    fireEvent.change(searchInput, { target: { value: 'Wire Harness' } });
    expect(screen.getByText(/Wire Harness B/i)).toBeInTheDocument();
    expect(screen.queryByText(/Electronics Component A/i)).not.toBeInTheDocument();
  });

  it('shows low stock badge for low stock products', () => {
    render(<ProductManagement />);
    expect(screen.getAllByText(/Low Stock/i).length).toBeGreaterThan(0);
  });
});
