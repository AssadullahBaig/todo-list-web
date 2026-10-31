import { useState } from "react";
import {
  CheckSquare,
  PlusCircle,
  Calendar,
  Flag,
  Plus,
  Search,
  SlidersHorizontal,
  Download,
  Star,
  Trash2,
  Pencil,
} from "lucide-react";

function TodoHeader({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  taskView,
  onTaskViewChange,
  totalTasks,
  completedTasks,
  completionPercentage,
  isSelectionMode,
  onToggleSelectionMode,
  selectedCount,
  onSelectVisible,
  onClearSelection,
  onCompleteSelected,
  onEditSelected,
  onPinSelected,
  onDeleteSelected,
  onOpenDashboard,
  onToggleForm,
  onQuickAddTask,
  listFilter = "All",
  todayCount = 0,
}) {
  const [quickTitle, setQuickTitle] = useState("");

  function handleQuickSubmit(e) {
    e.preventDefault();
    const trimmed = quickTitle.trim();
    if (!trimmed) {
      if (onToggleForm) onToggleForm();
      return;
    }

    if (onQuickAddTask) {
      onQuickAddTask(trimmed);
      setQuickTitle("");
    } else if (onToggleForm) {
      onToggleForm();
    }
  }

  const activeCount = totalTasks - completedTasks;

  return (
    <header className="mb-6 space-y-6">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              My Tasks
            </h1>
            <span className="rounded border border-[#27272a] bg-[#18181b] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {listFilter === "All" ? "Sprint 14" : listFilter}
            </span>
          </div>
          <p className="text-sm text-zinc-400">
            Manage your engineering deliverables, active sprint objectives, and backlogs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:bg-[#201f22] hover:text-white"
          >
            <SlidersHorizontal size={14} />
            <span>View Analytics</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("todos") || "[]");
              const downloadAnchor = document.createElement("a");
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "tasks-export.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#18181b] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:bg-[#201f22] hover:text-white"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Sprint / Productivity Progress Overview Card */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#27272a] bg-[#18181b] p-4 md:flex-row md:items-center">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onOpenDashboard}
            className="flex flex-col text-left transition hover:opacity-80"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Sprint Completion
            </span>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {completionPercentage}%
              </span>
              <span className="text-xs text-zinc-400">
                {completedTasks} of {totalTasks} done
              </span>
            </div>
          </button>

          <div className="hidden h-8 w-[1px] bg-[#27272a] sm:block" />

          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              In Progress
            </span>
            <span className="mt-0.5 text-2xl font-bold text-white">
              {activeCount} Tasks
            </span>
          </div>

          <div className="hidden h-8 w-[1px] bg-[#27272a] sm:block" />

          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Assigned Lead
            </span>
            <span className="mt-1 text-sm font-medium text-zinc-300">
              Assadullah
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5 md:w-64">
          <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
            <span>Progress</span>
            <span className="font-semibold text-white">{completionPercentage}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-[#27272a] bg-[#09090b]">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Clean Task Quick Entry Input matching Stitch */}
      <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-2.5 transition-colors focus-within:border-zinc-500">
        <form
          onSubmit={handleQuickSubmit}
          className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2.5 px-3">
            <PlusCircle size={18} className="text-zinc-500" />
            <input
              type="text"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              placeholder="Add a new task... (press Enter to save, or open form for details)"
              className="w-full border-none bg-transparent p-0 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-[#27272a] pt-2 sm:justify-end sm:border-t-0 sm:pt-0">
            <div className="flex items-center gap-1 px-2 text-zinc-400">
              <button
                type="button"
                onClick={onToggleForm}
                title="Open detailed task form"
                className="rounded p-1 hover:text-white"
              >
                <Calendar size={16} />
              </button>
              <button
                type="button"
                onClick={onToggleForm}
                title="Set priority & list"
                className="rounded p-1 hover:text-white"
              >
                <Flag size={16} />
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>

      {/* Task Filters and Search Toolbar */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#27272a] py-1 sm:flex-row sm:items-center">
        {/* Status & View Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto sm:gap-6">
          <button
            type="button"
            onClick={() => {
              onFilterChange("All");
              onTaskViewChange("all");
            }}
            className={`flex items-center gap-2 whitespace-nowrap px-1 pb-2.5 text-sm font-medium transition-colors ${
              filter === "All" && taskView === "all"
                ? "border-b-2 border-white font-semibold text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>All Tasks</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                filter === "All" && taskView === "all"
                  ? "bg-zinc-800 text-zinc-200"
                  : "bg-[#18181b] text-zinc-400"
              }`}
            >
              {totalTasks}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onFilterChange("Active");
              onTaskViewChange("all");
            }}
            className={`flex items-center gap-2 whitespace-nowrap px-1 pb-2.5 text-sm font-medium transition-colors ${
              filter === "Active"
                ? "border-b-2 border-white font-semibold text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Active</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                filter === "Active"
                  ? "bg-zinc-800 text-zinc-200"
                  : "bg-[#18181b] text-zinc-400"
              }`}
            >
              {activeCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onFilterChange("Completed");
              onTaskViewChange("all");
            }}
            className={`flex items-center gap-2 whitespace-nowrap px-1 pb-2.5 text-sm font-medium transition-colors ${
              filter === "Completed"
                ? "border-b-2 border-white font-semibold text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Completed</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                filter === "Completed"
                  ? "bg-zinc-800 text-zinc-200"
                  : "bg-[#18181b] text-zinc-400"
              }`}
            >
              {completedTasks}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTaskViewChange(taskView === "today" ? "all" : "today")}
            className={`flex items-center gap-2 whitespace-nowrap px-1 pb-2.5 text-sm font-medium transition-colors ${
              taskView === "today"
                ? "border-b-2 border-white font-semibold text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Today</span>
            {todayCount > 0 && (
              <span className="rounded-full bg-[#18181b] px-1.5 py-0.2 text-[10px] text-zinc-400">
                {todayCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTaskViewChange(taskView === "upcoming" ? "all" : "upcoming")}
            className={`flex items-center gap-2 whitespace-nowrap px-1 pb-2.5 text-sm font-medium transition-colors ${
              taskView === "upcoming"
                ? "border-b-2 border-white font-semibold text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Upcoming</span>
          </button>
        </div>

        {/* Filter Input & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter tasks..."
              className="w-full rounded-lg border border-[#27272a] bg-[#18181b] py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:bg-[#1f1f23] focus:ring-1 focus:ring-zinc-500 sm:w-44"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-[#27272a] bg-[#18181b] px-2.5 py-1.5 text-xs text-zinc-300 outline-none transition-colors hover:bg-[#201f22] cursor-pointer"
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

      {/* Batch Action Bar Shortcuts */}
      <div className="flex items-center justify-between rounded-lg border border-[#27272a] bg-[#131316] px-3.5 py-2 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelectionMode && selectedCount > 0}
            onChange={onToggleSelectionMode}
            className="h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-white focus:ring-zinc-600 focus:ring-offset-0"
          />
          <span>
            {isSelectionMode
              ? `${selectedCount} task(s) selected`
              : "Select all visible tasks"}
          </span>
          {!isSelectionMode && (
            <button
              type="button"
              onClick={onSelectVisible}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              (select visible)
            </button>
          )}
        </div>

        {isSelectionMode && selectedCount > 0 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCompleteSelected}
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              <CheckSquare size={14} />
              <span>Mark Done</span>
            </button>
            {selectedCount === 1 && (
              <>
                <span className="text-zinc-700">|</span>
                <button
                  type="button"
                  onClick={onEditSelected}
                  className="flex items-center gap-1 transition-colors hover:text-white"
                >
                  <Pencil size={14} />
                  <span>Edit</span>
                </button>
              </>
            )}
            <span className="text-zinc-700">|</span>
            <button
              type="button"
              onClick={onPinSelected}
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              <Star size={14} />
              <span>Pin</span>
            </button>
            <span className="text-zinc-700">|</span>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="flex items-center gap-1 text-rose-400 transition-colors hover:text-rose-300"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
            <span className="text-zinc-700">|</span>
            <button
              type="button"
              onClick={onClearSelection}
              className="text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default TodoHeader;
