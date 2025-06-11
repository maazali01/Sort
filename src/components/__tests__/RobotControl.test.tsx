import React from 'react';
import { render, screen } from '@testing-library/react';
import RobotControl from '../RobotControl';

describe('RobotControl', () => {
  it('renders Robot Control Center header', () => {
    render(<RobotControl />);
    expect(screen.getByText(/Robot Control Center/i)).toBeInTheDocument();
  });

  it('renders fleet overview cards', () => {
    render(<RobotControl />);
    expect(screen.getByText(/Active Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Idle Robots/i)).toBeInTheDocument();
    expect(screen.getByText(/In Maintenance/i)).toBeInTheDocument();
    expect(screen.getByText(/Avg Efficiency/i)).toBeInTheDocument();
  });

  it('renders robot cards', () => {
    render(<RobotControl />);
    expect(screen.getByText(/Alpha Sorter/i)).toBeInTheDocument();
    expect(screen.getByText(/Beta Sorter/i)).toBeInTheDocument();
  });
});
