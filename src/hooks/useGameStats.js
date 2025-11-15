import { useState, useEffect, useRef } from 'react';
import { INITIAL_STATS } from '../utils/constants';
import { loadStats, saveStats } from '../utils/storage';

/**
 * Custom hook for managing game statistics
 */
export function useGameStats(winner, currentSquares) {
  const [stats, setStats] = useState(loadStats);
  const previousWinnerRef = useRef(null);

  // Update statistics when game ends
  useEffect(() => {
    if (winner && winner !== previousWinnerRef.current) {
      previousWinnerRef.current = winner;
      
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalGames: prevStats.totalGames + 1,
          xWins: winner === 'X' ? prevStats.xWins + 1 : prevStats.xWins,
          oWins: winner === 'O' ? prevStats.oWins + 1 : prevStats.oWins
        };
        saveStats(newStats);
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
        saveStats(newStats);
        return newStats;
      });
    }
  }, [currentSquares, winner]);

  function resetStats() {
    setStats(INITIAL_STATS);
    localStorage.removeItem('ticTacToeStats');
  }

  return { stats, resetStats };
}

