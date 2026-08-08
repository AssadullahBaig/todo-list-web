import { CheckCircle2, Search } from "lucide-react";

function TodoHeader({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
}) {
  return (
    <section className="p-8">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            My Tasks
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Manage your daily work efficiently.
          </p>
        </div>

        <div className="hidden rounded-2xl border border-slate-800 bg-[#111827] px-6 py-4 lg:flex lg:flex-col">
          <span className="text-sm text-slate-400">Productivity</span>

          <div className="mt-2 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-400" />

            <span className="text-lg font-semibold text-white">
              Stay Organized
            </span>
          </div>
        </div>
      </div>

      {/* Search / Filter / Sort */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="h-12 w-full rounded-xl border border-slate-700 bg-[#111827] pl-11 pr-4 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter */}
          <button
            type="button"
            onClick={() => onFilterChange("All")}
            className={`rounded-xl px-5 py-2 font-medium transition ${
              filter === "All"
                ? "bg-violet-600 text-white"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("Active")}
            className={`rounded-xl px-5 py-2 font-medium transition ${
              filter === "Active"
                ? "bg-violet-600 text-white"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Active
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("Completed")}
            className={`rounded-xl px-5 py-2 font-medium transition ${
              filter === "Completed"
                ? "bg-violet-600 text-white"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Completed
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-10 rounded-xl border border-slate-700 bg-[#111827] px-4 text-sm font-medium text-slate-300 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default TodoHeader;
