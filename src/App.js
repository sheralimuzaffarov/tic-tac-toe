import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Constants
const BOARD_SIZE = 3;
const WINNING_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

const INITIAL_STATS = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  totalGames: 0
};

// Confetti Component
function Confetti({ show }) {
  if (!show) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 -top-2.5 animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
}

// Square Component
function Square({ value, onSquareClick, isWinning, isFocused, hoverPreview, onMouseEnter, onMouseLeave }) {
  const displayValue = hoverPreview || value;
  const showHover = hoverPreview && !value;
  
  const baseClasses = "bg-white border-2 rounded-lg text-5xl font-bold h-24 w-24 p-0 text-center cursor-pointer transition-all duration-200 flex items-center justify-center relative";
  const stateClasses = `
    ${isWinning ? 'bg-yellow-100 border-green-500 border-[3px] animate-highlight' : 'border-gray-300'}
    ${value ? 'cursor-default' : ''}
    ${isFocused ? 'outline-4 outline-primary outline-offset-2 z-10' : ''}
    ${showHover ? 'text-primary opacity-50 font-normal' : 'text-gray-800'}
    ${!value && !isWinning ? 'hover:bg-gray-100 hover:border-primary hover:-translate-y-0.5 hover:shadow-md' : ''}
  `.trim();
  
  return (
    <button 
      className={`${baseClasses} ${stateClasses}`}
      onClick={onSquareClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={value ? `Square ${value}` : 'Empty square'}
      disabled={!!value}
    >
      {displayValue}
    </button>
  );
}

// Board Component
function Board({ squares, onPlay, xIsNext, focusedIndex, onFocusChange }) {
  const { winner, line: winningLine } = calculateWinner(squares) || { winner: null, line: null };
  const isDraw = !winner && squares.every(Boolean);
  const boardRef = useRef(null);

  const handleClick = useCallback((i) => {
    // Prevent click if game is over or square is already filled
    if (winner || isDraw || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }, [winner, isDraw, squares, xIsNext, onPlay]);

  function handleSquareHover(i) {
    if (!winner && !isDraw && !squares[i]) {
      onFocusChange(i);
    }
  }

  function handleSquareLeave() {
    onFocusChange(null);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (winner || isDraw) return;
      
      // Number keys 1-9
      const numKey = parseInt(e.key);
      if (numKey >= 1 && numKey <= 9) {
        const index = numKey - 1;
        if (!squares[index]) {
          handleClick(index);
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
            handleClick(focusedIndex);
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
  }, [focusedIndex, squares, winner, isDraw, xIsNext, onFocusChange, handleClick]);

  function getStatusMessage() {
    if (winner) {
      return `🎉 Winner: ${winner}!`;
    }
    if (isDraw) {
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
    : isDraw 
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

// Statistics Component
function Statistics({ stats, onResetStats }) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md border border-slate-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Game Statistics</h3>
        <button 
          onClick={onResetStats} 
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-md cursor-pointer transition-all duration-200 hover:bg-amber-500 hover:text-white hover:border-amber-500" 
          title="Reset statistics"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">X Wins</span>
          <span className="text-3xl font-bold text-blue-600">{stats.xWins}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">O Wins</span>
          <span className="text-3xl font-bold text-red-600">{stats.oWins}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">Draws</span>
          <span className="text-3xl font-bold text-amber-600">{stats.draws}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">Total</span>
          <span className="text-3xl font-bold text-slate-700">{stats.totalGames}</span>
        </div>
      </div>
    </div>
  );
}

// Move History Filter Component
function MoveHistoryFilter({ filterPlayer, onFilterPlayerChange, searchQuery, onSearchQueryChange, isAscending, onToggleOrder }) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 shadow-md border border-slate-200 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filter Moves</h3>
        <button 
          onClick={onToggleOrder}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-primary-hover shadow-sm"
          title="Toggle sort order"
        >
          {isAscending ? '⬇️ Desc' : '⬆️ Asc'}
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Player Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Filter by Player</label>
          <div className="flex gap-2">
            {['All', 'X', 'O'].map((player) => (
              <button
                key={player}
                onClick={() => onFilterPlayerChange(player === 'All' ? null : player)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  filterPlayer === (player === 'All' ? null : player)
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {player}
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Search by Location</label>
          <input
            type="text"
            placeholder="e.g., (0,0) or 0,0"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

// Game Component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filterPlayer, setFilterPlayer] = useState(null); // null = all, 'X' or 'O'
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('ticTacToeStats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });
  const previousWinnerRef = useRef(null);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { winner } = calculateWinner(currentSquares) || { winner: null };

  // Update statistics when game ends
  useEffect(() => {
    if (winner && winner !== previousWinnerRef.current) {
      previousWinnerRef.current = winner;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalGames: prevStats.totalGames + 1,
          xWins: winner === 'X' ? prevStats.xWins + 1 : prevStats.xWins,
          oWins: winner === 'O' ? prevStats.oWins + 1 : prevStats.oWins
        };
        localStorage.setItem('ticTacToeStats', JSON.stringify(newStats));
        return newStats;
      });
    } else if (!winner && previousWinnerRef.current) {
      previousWinnerRef.current = null;
    }
  }, [winner]);

  // Check for draw
  useEffect(() => {
    const isDraw = !winner && currentSquares.every(Boolean);
    if (isDraw && !previousWinnerRef.current) {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalGames: prevStats.totalGames + 1,
          draws: prevStats.draws + 1
        };
        localStorage.setItem('ticTacToeStats', JSON.stringify(newStats));
        return newStats;
      });
    }
  }, [currentSquares, winner]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setFocusedIndex(null);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setFocusedIndex(null);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setFocusedIndex(null);
    previousWinnerRef.current = null;
    setFilterPlayer(null);
    setSearchQuery('');
  }

  function handleUndo() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setFocusedIndex(null);
    }
  }

  function handleRedo() {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1);
      setFocusedIndex(null);
    }
  }

  function resetStats() {
    setStats(INITIAL_STATS);
    localStorage.removeItem('ticTacToeStats');
  }

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (currentMove > 0) {
          setCurrentMove(currentMove - 1);
          setFocusedIndex(null);
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (currentMove < history.length - 1) {
          setCurrentMove(currentMove + 1);
          setFocusedIndex(null);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMove, history.length]);

  function getMoveLocation(squares, prevSquares) {
    const moveIndex = squares.findIndex((val, idx) => val !== prevSquares[idx]);
    const row = Math.floor(moveIndex / BOARD_SIZE);
    const col = moveIndex % BOARD_SIZE;
    return { row, col, moveIndex };
  }

  function getMovePlayer(move, squares, prevSquares) {
    if (move === 0) return null;
    const moveIndex = squares.findIndex((val, idx) => val !== prevSquares[idx]);
    return squares[moveIndex];
  }

  // Filter and process moves
  const processedMoves = useMemo(() => {
    return history.map((squares, move) => {
      const isCurrentMove = move === currentMove;
      let description;
      let player = null;
      let location = null;
      
      if (move === 0) {
        description = 'Go to game start';
      } else {
        const { row, col } = getMoveLocation(squares, history[move - 1]);
        player = getMovePlayer(move, squares, history[move - 1]);
        location = { row, col };
        description = `Go to move #${move} (${row}, ${col})`;
      }

      return {
        move,
        description,
        isCurrentMove,
        player,
        location
      };
    });
  }, [history, currentMove]);

  // Apply filters
  const filteredMoves = useMemo(() => {
    let filtered = processedMoves;

    // Filter by player
    if (filterPlayer) {
      filtered = filtered.filter(m => m.player === filterPlayer || m.move === 0);
    }

    // Filter by search query (location)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().replace(/[()]/g, '');
      const [row, col] = query.split(',').map(Number);
      if (!isNaN(row) && !isNaN(col)) {
        filtered = filtered.filter(m => 
          m.move === 0 || (m.location && m.location.row === row && m.location.col === col)
        );
      } else {
        // Text search
        filtered = filtered.filter(m => 
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    return filtered;
  }, [processedMoves, filterPlayer, searchQuery]);

  // Sort moves
  const displayMoves = isAscending ? filteredMoves : [...filteredMoves].reverse();

  const moves = displayMoves.map(({ move, description, isCurrentMove }) => {
    return (
      <li 
        key={move} 
        className={`mb-2 p-2 rounded-lg transition-all duration-200 ${
          isCurrentMove 
            ? 'bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-md' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        {isCurrentMove ? (
          <span className="block px-4 py-2.5 text-white">You are at move #{move}</span>
        ) : (
          <button 
            onClick={() => jumpTo(move)} 
            className="w-full px-4 py-2.5 text-sm text-left bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 text-gray-800 hover:bg-primary hover:text-white hover:border-primary hover:translate-x-1 hover:shadow-md"
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  const canUndo = currentMove > 0;
  const canRedo = currentMove < history.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <Confetti show={showConfetti} />
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold m-0 text-center md:text-left" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
              🎮 Tic Tac Toe
            </h1>
            <button 
              onClick={resetGame} 
              className="px-6 py-3 text-base font-semibold text-white rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-white/20 backdrop-blur-md border-2 border-white/30 hover:bg-white/30" 
              title="Start a new game"
            >
              🎯 New Game
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8">
            {/* Left Column - Game Board */}
            <div className="lg:col-span-2 flex justify-center items-start">
              <div className="w-full max-w-md">
                <Board 
                  squares={currentSquares} 
                  onPlay={handlePlay} 
                  xIsNext={xIsNext}
                  focusedIndex={focusedIndex}
                  onFocusChange={setFocusedIndex}
                />
                
                {/* Game Controls */}
                <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 shadow-md border border-gray-200">
                  <div className="flex gap-3 mb-3">
                    <button 
                      onClick={handleUndo}
                      disabled={!canUndo}
                      className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-md ${
                        canUndo 
                          ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0' 
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-none opacity-60'
                      }`}
                      title="Undo last move (Ctrl+Z)"
                    >
                      ↶ Undo
                    </button>
                    <button 
                      onClick={handleRedo}
                      disabled={!canRedo}
                      className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-md ${
                        canRedo 
                          ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0' 
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-none opacity-60'
                      }`}
                      title="Redo move (Ctrl+Y)"
                    >
                      ↷ Redo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Statistics */}
              <Statistics stats={stats} onResetStats={resetStats} />

              {/* Move History */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md border border-slate-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <span>📜</span>
                  <span>Move History</span>
                </h2>
                
                {/* Filter Component */}
                <MoveHistoryFilter
                  filterPlayer={filterPlayer}
                  onFilterPlayerChange={setFilterPlayer}
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
                  isAscending={isAscending}
                  onToggleOrder={() => setIsAscending(!isAscending)}
                />

                {/* Moves List */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  {moves.length > 0 ? (
                    <ol className="list-none p-0 max-h-[400px] overflow-y-auto space-y-2">
                      {moves}
                    </ol>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No moves match your filters</p>
                      <button
                        onClick={() => {
                          setFilterPlayer(null);
                          setSearchQuery('');
                        }}
                        className="mt-2 text-xs text-primary hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate winner
function calculateWinner(squares) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}
