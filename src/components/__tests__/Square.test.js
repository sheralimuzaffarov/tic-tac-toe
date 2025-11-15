import { render, screen, fireEvent } from '@testing-library/react';
import Square from '../Square';

describe('Square', () => {
  const mockOnClick = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty square', () => {
    render(<Square value={null} onSquareClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: /empty square/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should render X value', () => {
    render(<Square value="X" onSquareClick={mockOnClick} />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('should render O value', () => {
    render(<Square value="O" onSquareClick={mockOnClick} />);
    expect(screen.getByText('O')).toBeInTheDocument();
  });

  it('should be disabled when value is set', () => {
    render(<Square value="X" onSquareClick={mockOnClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should call onSquareClick when clicked', () => {
    render(<Square value={null} onSquareClick={mockOnClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onSquareClick when disabled', () => {
    render(<Square value="X" onSquareClick={mockOnClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should show hover preview', () => {
    render(
      <Square 
        value={null} 
        onSquareClick={mockOnClick}
        hoverPreview="X"
      />
    );
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('should call onMouseEnter when hovered', () => {
    render(
      <Square 
        value={null} 
        onSquareClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when mouse leaves', () => {
    render(
      <Square 
        value={null} 
        onSquareClick={mockOnClick}
        onMouseLeave={mockOnMouseLeave}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.mouseLeave(button);
    expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should apply winning styles when isWinning is true', () => {
    render(
      <Square 
        value="X" 
        onSquareClick={mockOnClick}
        isWinning={true}
      />
    );
    const button = screen.getByRole('button');
    // Check for winning-related classes
    expect(button.className).toMatch(/yellow|green|highlight/i);
  });

  it('should apply focused styles when isFocused is true', () => {
    render(
      <Square 
        value={null} 
        onSquareClick={mockOnClick}
        isFocused={true}
      />
    );
    const button = screen.getByRole('button');
    // Check for focus-related classes
    expect(button.className).toMatch(/outline|primary/i);
  });
});

