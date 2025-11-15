import { BOARD_SIZE } from './constants';
import { getMoveLocation, getMovePlayer } from './gameLogic';

/**
 * Process moves history into structured format
 * @param {Array} history - Array of board states
 * @param {number} currentMove - Current move index
 * @returns {Array} - Processed moves with metadata
 */
export function processMoves(history, currentMove) {
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
}

/**
 * Filter moves based on player and search query
 * @param {Array} processedMoves - Processed moves array
 * @param {string|null} filterPlayer - Player to filter by ('X', 'O', or null)
 * @param {string} searchQuery - Search query string
 * @returns {Array} - Filtered moves
 */
export function filterMoves(processedMoves, filterPlayer, searchQuery) {
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
}

