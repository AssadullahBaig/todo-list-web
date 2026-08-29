import { CheckCircle2, ListChecks, Search } from "lucide-react";

function TodoHeader({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  priorityFilter,
  onPriorityFilterChange,
  totalTasks,
  completedTasks,
  completionPercentage,
  isSelectionMode,
  onToggleSelectionMode,
  selectedCount,
  onCompleteSelected,
}) {
  return (
    <section className="mb-7 w-full">
      {/* Page Heading */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            My Tasks
          </h1>

          <p className="mt-2 text-base leading-relaxed text-slate-400">
            Manage your daily work efficiently.
          </p>
        </div>

        {/* Productivity */}
        <div className="hidden min-w-[220px] rounded-2xl border border-slate-800 bg-[#111827] px-5 py-4 lg:block">
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Productivity
            </span>

            <span className="text-sm font-semibold text-violet-400">
              {completionPercentage}%
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <CheckCircle2 size={19} className="text-emerald-400" />

            <span className="text-sm font-semibold text-white">
              {completedTasks} of {totalTasks} completed
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search / Filter / Sort */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
            className="
              h-11 w-full rounded-xl
              border border-slate-700
              bg-[#111827] pl-11 pr-4
              text-sm text-white
              placeholder:text-slate-500
              outline-none
              transition
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleSelectionMode}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isSelectionMode
                ? "bg-violet-600 text-white hover:bg-violet-500"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1A]`}
          >
            <ListChecks size={16} />
            {isSelectionMode ? "Done" : "Select"}
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("All")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              filter === "All"
                ? "bg-violet-600 text-white hover:bg-violet-500"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1A]`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("Active")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              filter === "Active"
                ? "bg-violet-600 text-white hover:bg-violet-500"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1A]`}
          >
            Active
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("Completed")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              filter === "Completed"
                ? "bg-violet-600 text-white hover:bg-violet-500"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1A]`}
          >
            Completed
          </button>

          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="
              h-10 rounded-xl
              border border-slate-700
              bg-[#111827] px-4
              text-sm font-medium text-slate-300
              outline-none
              transition
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              h-10 rounded-xl
              border border-slate-700
              bg-[#111827] px-4
              text-sm font-medium text-slate-300
              outline-none
              transition
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
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
      {isSelectionMode && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
          <p className="text-sm font-medium text-slate-300">
            {selectedCount} {selectedCount === 1 ? "task" : "tasks"} selected
          </p>

          <button
            type="button"
            onClick={onCompleteSelected}
            disabled={selectedCount === 0}
            className="
            flex items-center gap-2 rounded-lg
            bg-emerald-600 px-4 py-2
            text-sm font-semibold text-white
            transition
            hover:bg-emerald-500
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-emerald-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500/60
          "
          >
            <CheckCircle2 size={16} />
            Complete selected
          </button>
        </div>
      )}
    </section>
  );
}

export default TodoHeader;
