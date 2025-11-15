import { useRef, useCallback } from 'react';
import { BOARD_SIZE } from '../utils/constants';
import { calculateWinner, isDraw } from '../utils/gameLogic';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import Square from './Square';

/**
 * Board component - renders the game board and handles interactions
 */
export default function Board({ squares, onPlay, xIsNext, focusedIndex, onFocusChange }) {
  const { winner, line: winningLine } = calculateWinner(squares) || { winner: null, line: null };
  const draw = isDraw(squares, winner);
  const boardRef = useRef(null);

  const handleClick = useCallback((i) => {
    // Prevent click if game is over or square is already filled
    if (winner || draw || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }, [winner, draw, squares, xIsNext, onPlay]);

  function handleSquareHover(i) {
    if (!winner && !draw && !squares[i]) {
      onFocusChange(i);
    }
  }

  function handleSquareLeave() {
    onFocusChange(null);
  }

  // Keyboard navigation
  useKeyboardNavigation({
    squares,
    winner,
    isDraw: draw,
    xIsNext,
    focusedIndex,
    onFocusChange,
    onSquareClick: handleClick
  });

  function getStatusMessage() {
    if (winner) {
      return `🎉 Winner: ${winner}!`;
    }
    if (draw) {
      return "🤝 It's a draw!";
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  function renderSquare(i) {
    const hoverPreview = focusedIndex === i && !squares[i] ? (xIsNext ? 'X' : 'O') : null;
    
    return (
      <Square 
        key={i} 
        value={squares[i]} 
        isWinning={winningLine?.includes(i)} 
        isFocused={focusedIndex === i}
        hoverPreview={hoverPreview}
        onSquareClick={() => handleClick(i)}
        onMouseEnter={() => handleSquareHover(i)}
        onMouseLeave={() => handleSquareLeave()}
      />
    );
  }

  // Build board using map instead of loops for cleaner code
  const board = Array(BOARD_SIZE).fill(null).map((_, row) => (
    <div className="flex gap-1 mb-1 last:mb-0" key={row}>
      {Array(BOARD_SIZE).fill(null).map((_, col) => 
        renderSquare(row * BOARD_SIZE + col)
      )}
    </div>
  ));

  const statusClasses = winner 
    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white animate-pulse-scale shadow-lg'
    : draw 
    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg'
    : 'bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 border-2 border-slate-200 shadow-md';

  return (
    <div className="flex flex-col items-center gap-6" ref={boardRef}>
      <div className={`text-2xl font-semibold px-6 py-4 rounded-xl text-center min-w-[280px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${statusClasses}`}>
        <span className="flex-1">{getStatusMessage()}</span>
        {winner && <span className="text-3xl font-bold animate-bounce-scale">{winner}</span>}
      </div>
      <div className="inline-block bg-gradient-to-br from-white to-slate-50 rounded-xl p-3 shadow-lg border-2 border-slate-200">{board}</div>
    </div>
  );
}

