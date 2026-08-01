function TodoHeader({ searchTerm, onSearchChange, filter, onFilterChange }) {
  return (
    <section className="mb-8">
      <h1 className="px-4 text-4xl font-bold text-white">My Tasks</h1>

      <p className="mt-2 px-4 text-slate-400">
        Manage your daily work efficiently.
      </p>

      <div className="mt-6 px-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-violet-500"
        />
      </div>

      <div className="mt-4 flex gap-3 px-4">
        <button
          onClick={() => onFilterChange("All")}
          className={`rounded-lg px-4 py-2 ${
            filter === "All"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => onFilterChange("Active")}
          className={`rounded-lg px-4 py-2 ${
            filter === "Active"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => onFilterChange("Completed")}
          className={`rounded-lg px-4 py-2 ${
            filter === "Completed"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Completed
        </button>
      </div>
    </section>
  );
}

export default TodoHeader;
