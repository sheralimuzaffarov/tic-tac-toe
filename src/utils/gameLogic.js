import { BOARD_SIZE, WINNING_LINES } from './constants';

/**
 * Calculate the winner of the game
 * @param {Array<string|null>} squares - Array of 9 squares
 * @returns {Object|null} - { winner: 'X'|'O', line: [number, number, number] } or null
 */
export function calculateWinner(squares) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

/**
 * Get the location (row, col) of a move
 * @param {Array<string|null>} squares - Current board state
 * @param {Array<string|null>} prevSquares - Previous board state
 * @returns {Object} - { row: number, col: number, moveIndex: number }
 */
export function getMoveLocation(squares, prevSquares) {
  const moveIndex = squares.findIndex((val, idx) => val !== prevSquares[idx]);
  const row = Math.floor(moveIndex / BOARD_SIZE);
  const col = moveIndex % BOARD_SIZE;
  return { row, col, moveIndex };
}

/**
 * Get the player who made a move
 * @param {number} move - Move number
 * @param {Array<string|null>} squares - Current board state
 * @param {Array<string|null>} prevSquares - Previous board state
 * @returns {string|null} - 'X', 'O', or null
 */
export function getMovePlayer(move, squares, prevSquares) {
  if (move === 0) return null;
  const moveIndex = squares.findIndex((val, idx) => val !== prevSquares[idx]);
  return squares[moveIndex];
}

/**
 * Check if the game is a draw
 * @param {Array<string|null>} squares - Current board state
 * @param {string|null} winner - Current winner
 * @returns {boolean}
 */
export function isDraw(squares, winner) {
  return !winner && squares.every(Boolean);
}

