const badgeClassByStatus = {
  available: 'badge-success',
  selected: 'badge-warning',
  booked: 'badge-error',
};

function TableStatusCards({ tables, selectedTableId }) {
  return (
    <section id="status" className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Floor summary
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-base-content">
            Table status
          </h2>
        </div>
        <span className="text-sm text-base-content/50">
          Bookings stay in localStorage after refresh.
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => {
          const status =
            table.status === 'booked'
              ? 'booked'
              : selectedTableId === table.id
                ? 'selected'
                : 'available';

          return (
            <article
              key={table.id}
              className="rounded-2xl border border-base-300 bg-base-100/80 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold">Table {table.number}</h3>
                  <p className="mt-1 text-sm text-base-content/55">
                    {table.capacity} guests · {table.shape}
                  </p>
                </div>
                <span className={`badge border-0 ${badgeClassByStatus[status]}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>

              {table.booking ? (
                <div className="mt-4 space-y-1 rounded-xl bg-base-200 px-3 py-3 text-sm leading-6 text-base-content/75">
                  <p>
                    <span className="text-base-content/45">Guest</span> ·{' '}
                    {table.booking.customerName}
                  </p>
                  <p>
                    <span className="text-base-content/45">When</span> ·{' '}
                    {table.booking.bookingDate} {table.booking.bookingTime}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-base-content/45">Ready for a reservation.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TableStatusCards;
