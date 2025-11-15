import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  const mockOnNewGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render game title', () => {
    render(<Header onNewGame={mockOnNewGame} />);
    expect(screen.getByText(/tic tac toe/i)).toBeInTheDocument();
  });

  it('should render new game button', () => {
    render(<Header onNewGame={mockOnNewGame} />);
    expect(screen.getByText(/new game/i)).toBeInTheDocument();
  });

  it('should call onNewGame when button is clicked', () => {
    render(<Header onNewGame={mockOnNewGame} />);
    
    const newGameButton = screen.getByText(/new game/i);
    fireEvent.click(newGameButton);
    
    expect(mockOnNewGame).toHaveBeenCalledTimes(1);
  });
});

