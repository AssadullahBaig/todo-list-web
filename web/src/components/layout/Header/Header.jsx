import { Search, Moon } from "lucide-react";

function Header({
  activeView = "todo",
  onViewChange,
  searchTerm = "",
  onSearchChange,
}) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#27272a] bg-[#0e0e11]/85 px-6 backdrop-blur-md lg:px-8">
      {/* Brand & Top Nav Links */}
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight text-white">
          TaskFlow
        </span>

        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => onViewChange && onViewChange("dashboard")}
            className={`text-sm font-medium transition-colors px-3 py-1 rounded-lg ${
              activeView === "dashboard"
                ? "text-white font-semibold border-b-2 border-white rounded-none"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => onViewChange && onViewChange("todo")}
            className={`text-sm font-medium transition-colors px-3 py-1 ${
              activeView === "todo"
                ? "text-white font-semibold border-b-2 border-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg"
            }`}
          >
            Todo
          </button>

          <button
            type="button"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-64 rounded-full border border-[#27272a] bg-[#18181b] py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-zinc-500 focus:bg-[#1f1f23] focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          <Moon size={18} />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#27272a] bg-zinc-800 text-xs font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
