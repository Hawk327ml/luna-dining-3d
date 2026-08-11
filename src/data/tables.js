export const DEFAULT_TABLES = [
  {
    id: 'table-1',
    number: 1,
    capacity: 2,
    position: [-3.4, 0, -1.9],
    shape: 'round',
    status: 'available',
    booking: null,
  },
  {
    id: 'table-2',
    number: 2,
    capacity: 4,
    position: [-0.9, 0, -2.1],
    shape: 'round',
    status: 'available',
    booking: null,
  },
  {
    id: 'table-3',
    number: 3,
    capacity: 4,
    position: [2.3, 0, -1.75],
    shape: 'round',
    status: 'available',
    booking: null,
  },
  {
    id: 'table-4',
    number: 4,
    capacity: 6,
    position: [-2.8, 0, 1.45],
    shape: 'long',
    status: 'available',
    booking: null,
  },
  {
    id: 'table-5',
    number: 5,
    capacity: 2,
    position: [0.55, 0, 1.25],
    shape: 'round',
    status: 'available',
    booking: null,
  },
  {
    id: 'table-6',
    number: 6,
    capacity: 6,
    position: [3.35, 0, 1.3],
    shape: 'long',
    status: 'available',
    booking: null,
  },
];

export const getEmptyTables = () =>
  DEFAULT_TABLES.map((table) => ({
    ...table,
    status: 'available',
    booking: null,
  }));
