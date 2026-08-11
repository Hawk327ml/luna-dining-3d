import { DEFAULT_TABLES, getEmptyTables } from '../data/tables';

const STORAGE_KEY = 'luna-dining-bookings-v1';

export function loadTables() {
  if (typeof window === 'undefined') {
    return getEmptyTables();
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return getEmptyTables();
    }

    const storedTables = JSON.parse(storedValue);
    if (!Array.isArray(storedTables)) {
      return getEmptyTables();
    }

    return DEFAULT_TABLES.map((defaultTable) => {
      const savedTable = storedTables.find((table) => table.id === defaultTable.id);
      if (!savedTable || savedTable.status !== 'booked') {
        return { ...defaultTable, status: 'available', booking: null };
      }

      return {
        ...defaultTable,
        status: 'booked',
        booking: savedTable.booking ?? null,
      };
    });
  } catch {
    return getEmptyTables();
  }
}

export function saveTables(tables) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
}

export function clearTables() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
