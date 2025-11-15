import { renderHook } from '@testing-library/react';
import { useKeyboardNavigation } from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  let mockOnSquareClick;
  let mockOnFocusChange;
  let squares;

  beforeEach(() => {
    mockOnSquareClick = jest.fn();
    mockOnFocusChange = jest.fn();
    squares = Array(9).fill(null);
    jest.clearAllMocks();
  });

  it('should call onSquareClick when number key 1-9 is pressed', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: null,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).toHaveBeenCalledWith(0);
  });

  it('should not call onSquareClick if square is already filled', () => {
    squares[0] = 'X';
    
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: null,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).not.toHaveBeenCalled();
  });

  it('should not handle keys when game is over (winner)', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: 'X',
      isDraw: false,
      xIsNext: true,
      focusedIndex: null,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).not.toHaveBeenCalled();
  });

  it('should not handle keys when game is a draw', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: true,
      xIsNext: true,
      focusedIndex: null,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).not.toHaveBeenCalled();
  });

  it('should handle ArrowRight key', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: 0,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnFocusChange).toHaveBeenCalled();
  });

  it('should handle ArrowLeft key', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: 1,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnFocusChange).toHaveBeenCalled();
  });

  it('should handle Enter key to place mark', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: 0,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).toHaveBeenCalledWith(0);
  });

  it('should handle Space key to place mark', () => {
    renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: 0,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    const event = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).toHaveBeenCalledWith(0);
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useKeyboardNavigation({
      squares,
      winner: null,
      isDraw: false,
      xIsNext: true,
      focusedIndex: null,
      onFocusChange: mockOnFocusChange,
      onSquareClick: mockOnSquareClick
    }));

    unmount();

    const event = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnSquareClick).not.toHaveBeenCalled();
  });
});

