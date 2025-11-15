// Game Constants
export const BOARD_SIZE = 3;

export const WINNING_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

export const INITIAL_STATS = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  totalGames: 0
};

export const STATS_STORAGE_KEY = 'ticTacToeStats';

