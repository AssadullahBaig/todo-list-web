import { Search, Bell, Sun } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-[#070B1A]/95 px-10 backdrop-blur-md">
      {/* Search */}
      <div className="relative w-[420px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          className="h-12 w-full rounded-xl border border-slate-700 bg-[#111827] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition-all duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-[#111827] text-slate-300 transition hover:bg-slate-800 hover:text-white">
          <Sun size={18} />
        </button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-[#111827] text-slate-300 transition hover:bg-slate-800 hover:text-white">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500"></span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#111827] px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-medium text-white">Assadullah</p>

            <p className="text-xs text-slate-400">Developer</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
