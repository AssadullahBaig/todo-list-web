import { CheckCircle2, Search } from "lucide-react";

function TodoHeader({ searchTerm, onSearchChange, filter, onFilterChange }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-white">
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

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
            className="h-12 w-full rounded-xl border border-slate-700 bg-[#111827] pl-11 pr-4 text-white outline-none transition focus:border-violet-500"
          />
        </div>

        <div className="flex gap-3">
          <button
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
            onClick={() => onFilterChange("Completed")}
            className={`rounded-xl px-5 py-2 font-medium transition ${
              filter === "Completed"
                ? "bg-violet-600 text-white"
                : "bg-[#111827] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Completed
          </button>
        </div>
      </div>
    </section>
  );
}

export default TodoHeader;
