import { useEffect, useMemo, useState } from 'react';
import BookingForm from './components/BookingForm';
import Header from './components/Header';
import RestaurantScene from './components/RestaurantScene';
import TableStatusCards from './components/TableStatusCards';
import { getEmptyTables } from './data/tables';
import { clearTables, loadTables, saveTables } from './utils/storage';

const emptyForm = {
  customerName: '',
  bookingDate: '',
  bookingTime: '',
};

function App() {
  const [tables, setTables] = useState(loadTables);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    saveTables(tables);
  }, [tables]);

  const selectedTable = useMemo(
    () => tables.find((table) => table.id === selectedTableId) ?? null,
    [selectedTableId, tables],
  );

  const bookedCount = tables.filter((table) => table.status === 'booked').length;
  const availableCount = tables.length - bookedCount;

  const handleTableSelect = (tableId) => {
    const nextTable = tables.find((table) => table.id === tableId);
    if (!nextTable || nextTable.status === 'booked') {
      setMessage({ type: 'error', text: 'That table is already booked.' });
      return;
    }

    setSelectedTableId(tableId);
    setMessage({ type: '', text: '' });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleBooking = (event) => {
    event.preventDefault();

    const customerName = formData.customerName.trim();
    const bookingDate = formData.bookingDate;
    const bookingTime = formData.bookingTime;

    if (!selectedTable) {
      setMessage({ type: 'error', text: 'Select an available table in the 3D room first.' });
      return;
    }

    if (!customerName || !bookingDate || !bookingTime) {
      setMessage({ type: 'error', text: 'Please complete name, date, and time.' });
      return;
    }

    if (selectedTable.status === 'booked') {
      setMessage({ type: 'error', text: 'This table has already been booked.' });
      return;
    }

    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === selectedTable.id
          ? {
              ...table,
              status: 'booked',
              booking: {
                customerName,
                bookingDate,
                bookingTime,
              },
            }
          : table,
      ),
    );

    setMessage({
      type: 'success',
      text: `Table ${selectedTable.number} reserved for ${customerName}.`,
    });
    setSelectedTableId(null);
    setFormData(emptyForm);
  };

  const handleReset = () => {
    clearTables();
    setTables(getEmptyTables());
    setSelectedTableId(null);
    setFormData(emptyForm);
    setMessage({ type: 'success', text: 'All demo bookings cleared.' });
  };

  return (
    <div className="min-h-screen font-sans text-base-content" data-theme="luna">
      <Header bookedCount={bookedCount} availableCount={availableCount} />

      <main>
        <section
          id="floor"
          className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.8fr)] lg:px-8"
        >
          <RestaurantScene
            tables={tables}
            selectedTableId={selectedTableId}
            onTableSelect={handleTableSelect}
          />
          <BookingForm
            formData={formData}
            message={message}
            onChange={handleFormChange}
            onSubmit={handleBooking}
            onReset={handleReset}
            selectedTable={selectedTable}
          />
        </section>

        <TableStatusCards tables={tables} selectedTableId={selectedTableId} />
      </main>

      <footer className="border-t border-base-300 px-4 py-8 text-center text-sm text-base-content/45 sm:px-8">
        Luna Dining · 3D table reservation by Hawk327ml
      </footer>
    </div>
  );
}

export default App;
