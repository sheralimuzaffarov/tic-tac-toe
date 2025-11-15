import { INITIAL_STATS, STATS_STORAGE_KEY } from './constants';

/**
 * Load statistics from localStorage
 * @returns {Object} - Statistics object
 */
export function loadStats() {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  } catch (error) {
    console.error('Error loading stats:', error);
    return INITIAL_STATS;
  }
}

/**
 * Save statistics to localStorage
 * @param {Object} stats - Statistics object to save
 */
export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

/**
 * Reset statistics in localStorage
 */
export function resetStats() {
  try {
    localStorage.removeItem(STATS_STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting stats:', error);
  }
}

