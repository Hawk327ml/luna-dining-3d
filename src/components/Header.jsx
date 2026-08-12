function Header({ bookedCount, availableCount }) {
  return (
    <header className="border-b border-base-300/80 bg-base-100/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-12">
        <div className="max-w-2xl animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
            3D Reservation
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-base-content sm:text-6xl">
            Luna Dining
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-base-content/65">
            Pick a table in the interactive floor plan, then lock the booking —
            status persists in localStorage for demos.
          </p>
          <p className="mt-2 text-sm text-base-content/45">
            Wood = open · Gold = selected · Red = booked
          </p>
          <a href="#floor" className="btn btn-primary mt-6">
            View floor plan
          </a>
        </div>

        <div
          className="flex gap-6 animate-rise text-sm text-base-content/55"
          style={{ animationDelay: '0.1s' }}
          aria-label="Table availability"
        >
          <div>
            <span className="block uppercase tracking-[0.14em]">Available</span>
            <strong className="mt-1 block font-display text-3xl text-primary">{availableCount}</strong>
          </div>
          <div className="w-px bg-base-300" aria-hidden="true" />
          <div>
            <span className="block uppercase tracking-[0.14em]">Booked</span>
            <strong className="mt-1 block font-display text-3xl text-error">{bookedCount}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
