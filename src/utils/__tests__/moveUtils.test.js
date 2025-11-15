import { processMoves, filterMoves } from '../moveUtils';

describe('moveUtils', () => {
  const mockHistory = [
    [null, null, null, null, null, null, null, null, null], // Move 0
    ['X', null, null, null, null, null, null, null, null], // Move 1
    ['X', 'O', null, null, null, null, null, null, null], // Move 2
    ['X', 'O', 'X', null, null, null, null, null, null],   // Move 3
  ];

  describe('processMoves', () => {
    it('should process moves correctly', () => {
      const result = processMoves(mockHistory, 2);
      
      expect(result).toHaveLength(4);
      expect(result[0]).toMatchObject({
        move: 0,
        description: 'Go to game start',
        isCurrentMove: false,
        player: null,
        location: null
      });
      expect(result[1]).toMatchObject({
        move: 1,
        description: expect.stringContaining('Go to move #1'),
        isCurrentMove: false,
        player: 'X',
        location: { row: 0, col: 0 }
      });
      expect(result[2]).toMatchObject({
        move: 2,
        isCurrentMove: true,
        player: 'O',
        location: { row: 0, col: 1 }
      });
    });

    it('should mark current move correctly', () => {
      const result = processMoves(mockHistory, 1);
      expect(result[1].isCurrentMove).toBe(true);
      expect(result[0].isCurrentMove).toBe(false);
      expect(result[2].isCurrentMove).toBe(false);
    });
  });

  describe('filterMoves', () => {
    const processedMoves = processMoves(mockHistory, 2);

    it('should return all moves when no filter applied', () => {
      const result = filterMoves(processedMoves, null, '');
      expect(result).toHaveLength(4);
    });

    it('should filter by player X', () => {
      const result = filterMoves(processedMoves, 'X', '');
      expect(result).toHaveLength(3); // Move 0 + X moves
      expect(result[0].move).toBe(0); // Game start always included
      expect(result[1].player).toBe('X');
      expect(result[2].player).toBe('X');
    });

    it('should filter by player O', () => {
      const result = filterMoves(processedMoves, 'O', '');
      expect(result).toHaveLength(2); // Move 0 + O moves
      expect(result[0].move).toBe(0);
      expect(result[1].player).toBe('O');
    });

    it('should filter by location coordinates', () => {
      const result = filterMoves(processedMoves, null, '0,0');
      expect(result.length).toBeGreaterThan(0);
      const move1 = result.find(m => m.move === 1);
      expect(move1).toBeDefined();
      expect(move1.location).toEqual({ row: 0, col: 0 });
    });

    it('should filter by location with parentheses', () => {
      const result = filterMoves(processedMoves, null, '(0,1)');
      expect(result.length).toBeGreaterThan(0);
      const move2 = result.find(m => m.move === 2);
      expect(move2).toBeDefined();
      expect(move2.location).toEqual({ row: 0, col: 1 });
    });

    it('should filter by text search', () => {
      const result = filterMoves(processedMoves, null, 'move #1');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(m => m.move === 1)).toBe(true);
    });

    it('should combine player and location filters', () => {
      const result = filterMoves(processedMoves, 'X', '0,0');
      expect(result.length).toBeGreaterThan(0);
      const move1 = result.find(m => m.move === 1);
      expect(move1).toBeDefined();
      expect(move1.player).toBe('X');
      expect(move1.location).toEqual({ row: 0, col: 0 });
    });
  });
});

