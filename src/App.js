import { useState, useMemo, useEffect } from 'react';
import { calculateWinner } from './utils/gameLogic';
import { processMoves, filterMoves } from './utils/moveUtils';
import { useGameStats } from './hooks/useGameStats';
import { useUndoRedo } from './hooks/useUndoRedo';
import Confetti from './components/Confetti';
import Header from './components/Header';
import Board from './components/Board';
import Statistics from './components/Statistics';
import MoveHistory from './components/MoveHistory';
import GameControls from './components/GameControls';

/**
 * Main Game Component
 */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filterPlayer, setFilterPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { winner } = calculateWinner(currentSquares) || { winner: null };
  
  // Game statistics hook
  const { stats, resetStats } = useGameStats(winner, currentSquares);

  // Show confetti on win
  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

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

  // Undo/Redo keyboard shortcuts
  useUndoRedo({
    currentMove,
    historyLength: history.length,
    onUndo: handleUndo,
    onRedo: handleRedo
  });

  // Process and filter moves
  const processedMoves = useMemo(() => {
    return processMoves(history, currentMove);
  }, [history, currentMove]);

  const filteredMoves = useMemo(() => {
    return filterMoves(processedMoves, filterPlayer, searchQuery);
  }, [processedMoves, filterPlayer, searchQuery]);

  const displayMoves = isAscending ? filteredMoves : [...filteredMoves].reverse();

  const canUndo = currentMove > 0;
  const canRedo = currentMove < history.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <Confetti show={showConfetti} />
          
          <Header onNewGame={resetGame} />

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
                
                <GameControls 
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Statistics stats={stats} onResetStats={resetStats} />

              <MoveHistory
                moves={displayMoves}
                onJumpTo={jumpTo}
                filterPlayer={filterPlayer}
                onFilterPlayerChange={setFilterPlayer}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                isAscending={isAscending}
                onToggleOrder={() => setIsAscending(!isAscending)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
