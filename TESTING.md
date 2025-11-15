# Testing Documentation

This document describes the testing setup and strategy for the Tic Tac Toe application.

## Test Structure

```
src/
├── setupTests.js                    # Test configuration
├── __tests__/
│   └── App.test.js                  # Integration tests
├── components/__tests__/
│   ├── Square.test.js
│   ├── Board.test.js
│   ├── Statistics.test.js
│   ├── MoveHistoryFilter.test.js
│   ├── GameControls.test.js
│   └── Header.test.js
├── hooks/__tests__/
│   ├── useGameStats.test.js
│   ├── useKeyboardNavigation.test.js
│   └── useUndoRedo.test.js
└── utils/__tests__/
    ├── gameLogic.test.js
    ├── moveUtils.test.js
    └── storage.test.js

e2e/
└── game-flow.spec.js                 # E2E tests
```

## Running Tests

### Unit and Integration Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Test Coverage

### Unit Tests
- **Utilities**: 100% coverage
  - `gameLogic.js` - All game logic functions
  - `moveUtils.js` - Move processing and filtering
  - `storage.js` - LocalStorage operations

- **Components**: 80%+ coverage
  - Square component (rendering, interactions, states)
  - Statistics component (display, reset)
  - GameControls (undo/redo buttons)
  - MoveHistoryFilter (filtering, search)
  - Header (title, new game button)

- **Hooks**: 90%+ coverage
  - `useGameStats` - Statistics management
  - `useKeyboardNavigation` - Keyboard events
  - `useUndoRedo` - Keyboard shortcuts

### Integration Tests
- Complete game flows (X wins, O wins, draw)
- Move history navigation
- Statistics updates
- Undo/Redo functionality
- Filter and search functionality
- Reset game functionality

### E2E Tests
- Complete game scenarios
- Keyboard navigation (number keys, arrow keys)
- Undo/Redo via keyboard shortcuts
- Move history filtering
- Statistics persistence
- Responsive design

## Testing Libraries

- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Additional DOM matchers
- **Playwright** - End-to-end testing framework

## Test Best Practices

1. **Isolation**: Each test is independent and doesn't rely on other tests
2. **Arrange-Act-Assert**: Tests follow the AAA pattern
3. **Descriptive Names**: Test names clearly describe what they test
4. **Mock External Dependencies**: localStorage and other external APIs are mocked
5. **Accessibility**: Tests use semantic queries (getByRole, getByLabelText)
6. **User-Centric**: Tests focus on user behavior, not implementation details

## Writing New Tests

### Component Test Example
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Hook Test Example
```javascript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });
});
```

### E2E Test Example
```javascript
import { test, expect } from '@playwright/test';

test('should complete a game', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="square-0"]');
  await expect(page.getByText('X')).toBeVisible();
});
```

## Continuous Integration

Tests should be run:
- Before committing code
- In CI/CD pipeline
- Before deploying to production

## Notes

- Some integration tests may be flaky due to async timing. Use `waitFor` for async assertions.
- E2E tests require the dev server to be running (handled automatically by Playwright).
- Mock data is reset between tests to ensure isolation.

