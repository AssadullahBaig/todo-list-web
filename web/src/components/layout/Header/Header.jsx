import { Search, Moon } from "lucide-react";

function Header({
  activeView = "todo",
  searchTerm = "",
  onSearchChange,
  listFilter = "All",
}) {
  return (
    <nav className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#27272a] bg-[#09090b]/85 px-6 backdrop-blur-md lg:px-8">
      {/* Breadcrumb Indicator */}
      <div className="flex items-center gap-2.5 text-sm">
        <span className="font-semibold text-white">
          {activeView === "dashboard" ? "Dashboard" : "My Tasks"}
        </span>
        {activeView === "todo" && listFilter && listFilter !== "All" && (
          <>
            <span className="text-zinc-600">/</span>
            <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-300">
              {listFilter}
            </span>
          </>
        )}
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
