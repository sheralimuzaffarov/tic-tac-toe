import { useEffect } from 'react';

/**
 * Custom hook for keyboard navigation on the board
 */
export function useKeyboardNavigation({
  squares,
  winner,
  isDraw,
  xIsNext,
  focusedIndex,
  onFocusChange,
  onSquareClick
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (winner || isDraw) return;
      
      // Number keys 1-9
      const numKey = parseInt(e.key);
      if (numKey >= 1 && numKey <= 9) {
        const index = numKey - 1;
        if (!squares[index]) {
          onSquareClick(index);
        }
        return;
      }

      // Arrow keys
      if (focusedIndex === null) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const firstEmpty = squares.findIndex(sq => !sq);
          if (firstEmpty !== -1) onFocusChange(firstEmpty);
        }
        return;
      }

      let newIndex = focusedIndex;
      switch (e.key) {
        case 'ArrowRight':
          newIndex = (focusedIndex + 1) % 9;
          break;
        case 'ArrowLeft':
          newIndex = (focusedIndex - 1 + 9) % 9;
          break;
        case 'ArrowDown':
          newIndex = Math.min(focusedIndex + 3, 8);
          break;
        case 'ArrowUp':
          newIndex = Math.max(focusedIndex - 3, 0);
          break;
        case 'Enter':
        case ' ':
          if (!squares[focusedIndex]) {
            onSquareClick(focusedIndex);
          }
          break;
        default:
          return;
      }

      // Find next empty square if current is filled
      if (squares[newIndex] && e.key.startsWith('Arrow')) {
        const emptySquares = squares.map((sq, idx) => !sq ? idx : -1).filter(idx => idx !== -1);
        if (emptySquares.length > 0) {
          const currentEmptyIndex = emptySquares.indexOf(focusedIndex);
          let nextEmpty;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextEmpty = emptySquares[(currentEmptyIndex + 1) % emptySquares.length];
          } else {
            nextEmpty = emptySquares[(currentEmptyIndex - 1 + emptySquares.length) % emptySquares.length];
          }
          newIndex = nextEmpty !== undefined ? nextEmpty : emptySquares[0];
        }
      }

      onFocusChange(newIndex);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, squares, winner, isDraw, xIsNext, onFocusChange, onSquareClick]);
}

