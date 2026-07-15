function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900 p-6">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-violet-500">TaskFlow</h1>

        <p className="mt-1 text-sm text-slate-400">Premium Productivity</p>
      </div>

      {/* Navigation */}
      <nav className="mt-12 flex flex-1 flex-col gap-3">
        <button className="rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Dashboard
        </button>

        <button className="rounded-xl bg-violet-600 px-4 py-3 text-left font-medium text-white">
          Todo
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Settings
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          About
        </button>
      </nav>

      {/* Bottom Button */}
      <button className="rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500">
        + New Task
      </button>
    </aside>
  );
}

export default Sidebar;
