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
          <p className="mt-4 max-w-xl text-base leading-7 text-base-content/70">
            点桌选位 → 填表预订 · 状态保存在本机，演示可随时清空
          </p>
          <p className="mt-2 text-sm text-base-content/45">
            Tip: 木色空闲 · 金色已选 · 红色已订
          </p>
          <a href="#floor" className="btn btn-primary mt-6">
            进入厅堂
          </a>
        </div>

        <div
          className="flex gap-6 animate-rise text-sm text-base-content/55"
          style={{ animationDelay: '0.1s' }}
          aria-label="桌位概况"
        >
          <div>
            <span className="block uppercase tracking-[0.14em]">空闲</span>
            <strong className="mt-1 block font-display text-3xl text-primary">{availableCount}</strong>
          </div>
          <div className="w-px bg-base-300" aria-hidden="true" />
          <div>
            <span className="block uppercase tracking-[0.14em]">已订</span>
            <strong className="mt-1 block font-display text-3xl text-error">{bookedCount}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
