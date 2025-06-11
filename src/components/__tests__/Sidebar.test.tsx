import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('renders all menu items', () => {
    render(<Sidebar activeSection="dashboard" onSectionChange={() => {}} />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Robot Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Analytics & Reports/i)).toBeInTheDocument();
  });

  it('highlights the active section', () => {
    render(<Sidebar activeSection="orders" onSectionChange={() => {}} />);
    const ordersButton = screen.getByText(/Order Management/i).closest('button');
    expect(ordersButton).toHaveClass('bg-gradient-to-r');
  });

  it('calls onSectionChange when a menu item is clicked', () => {
    const onSectionChange = jest.fn();
    render(<Sidebar activeSection="dashboard" onSectionChange={onSectionChange} />);
    fireEvent.click(screen.getByText(/Product Management/i));
    expect(onSectionChange).toHaveBeenCalledWith('products');
  });
});
