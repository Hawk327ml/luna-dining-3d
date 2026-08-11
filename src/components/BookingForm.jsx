function BookingForm({
  formData,
  message,
  onChange,
  onSubmit,
  onReset,
  selectedTable,
}) {
  const selectedTableLabel = selectedTable ? `Table ${selectedTable.number}` : 'No table selected';
  const selectedCapacity = selectedTable ? `${selectedTable.capacity} guests` : 'Select on floor';

  return (
    <aside className="panel-shell rounded-2xl border border-base-300 bg-base-100 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Booking
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-base-content">
            Reserve a table
          </h2>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-error"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      {message.text && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'border-success/40 bg-success/15 text-success'
              : 'border-error/40 bg-error/15 text-error'
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="form-control">
          <span className="label-text font-medium text-base-content/70">Guest name</span>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            className="input input-bordered mt-2 w-full border-base-300 bg-base-200"
            placeholder="Name on the reservation"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium text-base-content/70">Date</span>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={onChange}
              className="input input-bordered mt-2 w-full border-base-300 bg-base-200"
            />
          </label>

          <label className="form-control">
            <span className="label-text font-medium text-base-content/70">Time</span>
            <input
              type="time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={onChange}
              className="input input-bordered mt-2 w-full border-base-300 bg-base-200"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium text-base-content/70">Selected table</span>
            <input
              type="text"
              value={selectedTableLabel}
              readOnly
              className="input input-bordered mt-2 w-full border-base-300 bg-base-200 font-semibold"
            />
          </label>

          <label className="form-control">
            <span className="label-text font-medium text-base-content/70">Capacity</span>
            <input
              type="text"
              value={selectedCapacity}
              readOnly
              className="input input-bordered mt-2 w-full border-base-300 bg-base-200 font-semibold"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Confirm booking
        </button>
      </form>
    </aside>
  );
}

export default BookingForm;
