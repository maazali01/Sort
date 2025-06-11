import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('App Navigation', () => {
  it('renders Dashboard by default', () => {
    render(<App />);
    expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  });

  it('navigates to Order Management', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Order Management/i));
    expect(screen.getByText(/Order Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage and track all customer orders/i)).toBeInTheDocument();
  });

  it('navigates to Product Management', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Product Management/i));
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage inventory, pricing, and product information/i)).toBeInTheDocument();
  });

  it('navigates to Robot Control', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Robot Control/i));
    expect(screen.getByText(/Robot Control Center/i)).toBeInTheDocument();
  });

  it('navigates to Analytics', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Analytics & Reports/i));
    expect(screen.getByText(/Analytics & Reports/i)).toBeInTheDocument();
  });
});
