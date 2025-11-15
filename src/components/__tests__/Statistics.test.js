import { render, screen, fireEvent } from '@testing-library/react';
import Statistics from '../Statistics';

describe('Statistics', () => {
  const mockStats = {
    xWins: 5,
    oWins: 3,
    draws: 2,
    totalGames: 10
  };

  const mockOnResetStats = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all statistics', () => {
    render(<Statistics stats={mockStats} onResetStats={mockOnResetStats} />);
    
    expect(screen.getByText('Game Statistics')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // X Wins
    expect(screen.getByText('3')).toBeInTheDocument(); // O Wins
    expect(screen.getByText('2')).toBeInTheDocument(); // Draws
    expect(screen.getByText('10')).toBeInTheDocument(); // Total
  });

  it('should display correct labels', () => {
    render(<Statistics stats={mockStats} onResetStats={mockOnResetStats} />);
    
    expect(screen.getByText('X Wins')).toBeInTheDocument();
    expect(screen.getByText('O Wins')).toBeInTheDocument();
    expect(screen.getByText('Draws')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('should call onResetStats when reset button is clicked', () => {
    render(<Statistics stats={mockStats} onResetStats={mockOnResetStats} />);
    
    const resetButton = screen.getByTitle('Reset statistics');
    fireEvent.click(resetButton);
    
    expect(mockOnResetStats).toHaveBeenCalledTimes(1);
  });

  it('should display zero stats correctly', () => {
    const zeroStats = {
      xWins: 0,
      oWins: 0,
      draws: 0,
      totalGames: 0
    };
    
    render(<Statistics stats={zeroStats} onResetStats={mockOnResetStats} />);
    
    expect(screen.getAllByText('0')).toHaveLength(4);
  });
});

