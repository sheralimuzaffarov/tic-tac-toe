import { calculateWinner, getMoveLocation, getMovePlayer, isDraw } from '../gameLogic';

describe('gameLogic', () => {
  describe('calculateWinner', () => {
    it('should return null for empty board', () => {
      const squares = Array(9).fill(null);
      expect(calculateWinner(squares)).toBeNull();
    });

    it('should detect winner in first row (X)', () => {
      const squares = ['X', 'X', 'X', null, null, null, null, null, null];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'X', line: [0, 1, 2] });
    });

    it('should detect winner in second row (O)', () => {
      const squares = [null, null, null, 'O', 'O', 'O', null, null, null];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'O', line: [3, 4, 5] });
    });

    it('should detect winner in third row (X)', () => {
      const squares = [null, null, null, null, null, null, 'X', 'X', 'X'];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'X', line: [6, 7, 8] });
    });

    it('should detect winner in first column (O)', () => {
      const squares = ['O', null, null, 'O', null, null, 'O', null, null];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'O', line: [0, 3, 6] });
    });

    it('should detect winner in second column (X)', () => {
      const squares = [null, 'X', null, null, 'X', null, null, 'X', null];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'X', line: [1, 4, 7] });
    });

    it('should detect winner in third column (O)', () => {
      const squares = [null, null, 'O', null, null, 'O', null, null, 'O'];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'O', line: [2, 5, 8] });
    });

    it('should detect winner in main diagonal (X)', () => {
      const squares = ['X', null, null, null, 'X', null, null, null, 'X'];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'X', line: [0, 4, 8] });
    });

    it('should detect winner in anti-diagonal (O)', () => {
      const squares = [null, null, 'O', null, 'O', null, 'O', null, null];
      const result = calculateWinner(squares);
      expect(result).toEqual({ winner: 'O', line: [2, 4, 6] });
    });

    it('should return null when no winner', () => {
      const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
      expect(calculateWinner(squares)).toBeNull();
    });
  });

  describe('getMoveLocation', () => {
    it('should calculate correct location for move at index 0', () => {
      const squares = ['X', null, null, null, null, null, null, null, null];
      const prevSquares = Array(9).fill(null);
      const result = getMoveLocation(squares, prevSquares);
      expect(result).toEqual({ row: 0, col: 0, moveIndex: 0 });
    });

    it('should calculate correct location for move at index 4 (center)', () => {
      const squares = [null, null, null, null, 'O', null, null, null, null];
      const prevSquares = Array(9).fill(null);
      const result = getMoveLocation(squares, prevSquares);
      expect(result).toEqual({ row: 1, col: 1, moveIndex: 4 });
    });

    it('should calculate correct location for move at index 8', () => {
      const squares = [null, null, null, null, null, null, null, null, 'X'];
      const prevSquares = Array(9).fill(null);
      const result = getMoveLocation(squares, prevSquares);
      expect(result).toEqual({ row: 2, col: 2, moveIndex: 8 });
    });
  });

  describe('getMovePlayer', () => {
    it('should return null for move 0 (game start)', () => {
      const squares = Array(9).fill(null);
      const prevSquares = Array(9).fill(null);
      expect(getMovePlayer(0, squares, prevSquares)).toBeNull();
    });

    it('should return X for X move', () => {
      const squares = ['X', null, null, null, null, null, null, null, null];
      const prevSquares = Array(9).fill(null);
      expect(getMovePlayer(1, squares, prevSquares)).toBe('X');
    });

    it('should return O for O move', () => {
      const squares = ['X', 'O', null, null, null, null, null, null, null];
      const prevSquares = ['X', null, null, null, null, null, null, null, null];
      expect(getMovePlayer(2, squares, prevSquares)).toBe('O');
    });
  });

  describe('isDraw', () => {
    it('should return true when board is full and no winner', () => {
      const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(isDraw(squares, null)).toBe(true);
    });

    it('should return false when there is a winner', () => {
      const squares = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(isDraw(squares, 'X')).toBe(false);
    });

    it('should return false when board is not full', () => {
      const squares = ['X', 'O', 'X', 'O', null, null, null, null, null];
      expect(isDraw(squares, null)).toBe(false);
    });
  });
});

