function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      {/* Search Bar */}
      <div className="w-96">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="text-slate-400 transition hover:text-white">
          ⚙️
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
          A
        </div>
      </div>
    </header>
  );
}

export default Header;
