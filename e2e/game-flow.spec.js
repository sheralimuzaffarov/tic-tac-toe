import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the game title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();
  });

  test('should play a complete game where X wins', async ({ page }) => {
    // X wins with top row
    await page.getByRole('button', { name: /empty square/i }).first().click(); // X at (0,0)
    await page.getByRole('button', { name: /empty square/i }).nth(3).click(); // O at (1,0)
    await page.getByRole('button', { name: /empty square/i }).nth(1).click(); // X at (0,1)
    await page.getByRole('button', { name: /empty square/i }).nth(4).click(); // O at (1,1)
    await page.getByRole('button', { name: /empty square/i }).nth(2).click(); // X at (0,2) - wins
    
    await expect(page.getByText(/winner: x/i)).toBeVisible();
  });

  test('should play a complete game where O wins', async ({ page }) => {
    // O wins with middle column
    await page.getByRole('button', { name: /empty square/i }).first().click(); // X
    await page.getByRole('button', { name: /empty square/i }).nth(1).click(); // O
    await page.getByRole('button', { name: /empty square/i }).nth(2).click(); // X
    await page.getByRole('button', { name: /empty square/i }).nth(4).click(); // O
    await page.getByRole('button', { name: /empty square/i }).nth(6).click(); // X
    await page.getByRole('button', { name: /empty square/i }).nth(7).click(); // O - wins
    
    await expect(page.getByText(/winner: o/i)).toBeVisible();
  });

  test('should detect a draw game', async ({ page }) => {
    // Play a draw scenario
    const squares = page.getByRole('button', { name: /empty square/i });
    
    await squares.nth(0).click(); // X
    await squares.nth(1).click(); // O
    await squares.nth(2).click(); // X
    await squares.nth(4).click(); // O
    await squares.nth(3).click(); // X
    await squares.nth(5).click(); // O
    await squares.nth(7).click(); // X
    await squares.nth(6).click(); // O
    await squares.nth(8).click(); // X
    
    await expect(page.getByText(/draw/i)).toBeVisible();
  });

  test('should navigate using keyboard number keys', async ({ page }) => {
    await page.keyboard.press('1'); // Should place X at position 0
    await expect(page.getByText('X')).toBeVisible();
    
    await page.keyboard.press('2'); // Should place O at position 1
    await expect(page.getByText('O')).toBeVisible();
  });

  test('should navigate using arrow keys and Enter', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    
    await expect(page.getByText('X')).toBeVisible();
  });

  test('should undo and redo moves', async ({ page }) => {
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click();
    await squares.nth(1).click();
    
    const undoButton = page.getByText('↶ Undo');
    await undoButton.click();
    
    await expect(page.getByText(/you are at move #1/i)).toBeVisible();
    
    const redoButton = page.getByText('↷ Redo');
    await redoButton.click();
    
    await expect(page.getByText(/you are at move #2/i)).toBeVisible();
  });

  test('should use keyboard shortcuts for undo/redo', async ({ page }) => {
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click();
    await squares.nth(1).click();
    
    // Undo with Ctrl+Z
    await page.keyboard.press('Control+Z');
    await expect(page.getByText(/you are at move #1/i)).toBeVisible();
    
    // Redo with Ctrl+Y
    await page.keyboard.press('Control+Y');
    await expect(page.getByText(/you are at move #2/i)).toBeVisible();
  });

  test('should filter moves by player', async ({ page }) => {
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click(); // X
    await squares.nth(1).click(); // O
    await squares.nth(2).click(); // X
    
    const xFilterButton = page.getByRole('button', { name: 'X' });
    await xFilterButton.click();
    
    // Should show X moves
    await expect(page.getByText(/go to move #1/i)).toBeVisible();
    await expect(page.getByText(/go to move #3/i)).toBeVisible();
  });

  test('should search moves by location', async ({ page }) => {
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click(); // (0,0)
    await squares.nth(4).click(); // (1,1)
    
    const searchInput = page.getByPlaceholderText(/e.g., \(0,0\)/i);
    await searchInput.fill('0,0');
    
    await expect(page.getByText(/go to move #1/i)).toBeVisible();
  });

  test('should reset game', async ({ page }) => {
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click();
    
    const newGameButton = page.getByText(/new game/i);
    await newGameButton.click();
    
    // Board should be reset
    const emptySquares = page.getByRole('button', { name: /empty square/i });
    await expect(emptySquares).toHaveCount(8);
  });

  test('should display statistics', async ({ page }) => {
    await expect(page.getByText('Game Statistics')).toBeVisible();
    await expect(page.getByText('X Wins')).toBeVisible();
    await expect(page.getByText('O Wins')).toBeVisible();
    await expect(page.getByText('Draws')).toBeVisible();
    await expect(page.getByText('Total')).toBeVisible();
  });

  test('should update statistics after game completion', async ({ page }) => {
    // Play a game where X wins
    const squares = page.getByRole('button', { name: /empty square/i });
    await squares.first().click(); // X
    await squares.nth(3).click(); // O
    await squares.nth(1).click(); // X
    await squares.nth(4).click(); // O
    await squares.nth(2).click(); // X wins
    
    await expect(page.getByText(/winner: x/i)).toBeVisible();
    
    // Statistics should update
    await expect(page.getByText('1', { exact: false })).toBeVisible(); // At least one stat updated
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();
    await expect(page.getByText(/new game/i)).toBeVisible();
  });
});

