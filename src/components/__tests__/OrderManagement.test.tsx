import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderManagement from '../OrderManagement';

describe('OrderManagement', () => {
  it('renders order summary cards', () => {
    render(<OrderManagement />);
    expect(screen.getByText(/Total Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it('filters orders by search', () => {
    render(<OrderManagement />);
    const searchInput = screen.getByPlaceholderText(/Search orders/i);
    fireEvent.change(searchInput, { target: { value: 'Sarah' } });
    expect(screen.getByText(/Sarah Johnson/i)).toBeInTheDocument();
    expect(screen.queryByText(/John Smith/i)).not.toBeInTheDocument();
  });

  it('shows no orders found for unmatched search', () => {
    render(<OrderManagement />);
    const searchInput = screen.getByPlaceholderText(/Search orders/i);
    fireEvent.change(searchInput, { target: { value: 'notfound' } });
    expect(screen.getByText(/No orders found/i)).toBeInTheDocument();
  });
});
