import TodoCard from "../TodoCard";
import { AlertTriangle, ClipboardList } from "lucide-react";

function TodoList({
  todos,
  overdueTodos,
  totalTaskCount,
  searchTerm,
  filter,
  priorityFilter,
  onClearFilters,
  onDelete,
  onToggle,
  onEdit,
  onTogglePinned,
}) {
  const hasNoVisibleTasks = todos.length === 0 && overdueTodos.length === 0;

  const hasActiveFilters =
    searchTerm.trim() !== "" || filter !== "All" || priorityFilter !== "All";

  if (hasNoVisibleTasks) {
    let title = "No Tasks Found";
    let message = "Try changing your search or filters.";

    if (totalTaskCount === 0) {
      title = "No Tasks Yet";
      message = "Create your first task to get started.";
    } else if (searchTerm.trim() !== "") {
      title = "No Matching Tasks";
      message = `No tasks match "${searchTerm.trim()}".`;
    } else if (filter === "Active" && priorityFilter !== "All") {
      title = `No Active ${priorityFilter} Priority Tasks`;
      message = "No active tasks match the selected priority.";
    } else if (filter === "Completed" && priorityFilter !== "All") {
      title = `No Completed ${priorityFilter} Priority Tasks`;
      message = "No completed tasks match the selected priority.";
    } else if (filter === "Active") {
      title = "No Active Tasks";
      message = "You're all caught up.";
    } else if (filter === "Completed") {
      title = "No Completed Tasks";
      message = "Complete a task and it will appear here.";
    } else if (priorityFilter !== "All") {
      title = `No ${priorityFilter} Priority Tasks`;
      message = "No tasks match the selected priority.";
    }

    return (
      <section className="rounded-3xl border border-dashed border-slate-700 bg-[#111827] py-16 text-center">
        <ClipboardList size={52} className="mx-auto mb-5 text-slate-500" />

        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">{message}</p>

        {totalTaskCount > 0 && hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="
              mt-6 rounded-xl
              bg-violet-600 px-4 py-2
              text-sm font-semibold text-white
              transition
              hover:bg-violet-500
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#111827]
            "
          >
            Clear Filters
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* Overdue Tasks */}
      {overdueTodos.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-400" />

              <h2 className="text-sm font-semibold uppercase tracking-wide text-red-400">
                Overdue
              </h2>
            </div>

            <span className="text-xs text-slate-500">
              {overdueTodos.length}{" "}
              {overdueTodos.length === 1 ? "task" : "tasks"} need attention
            </span>
          </div>

          <div className="space-y-4">
            {overdueTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
                onTogglePinned={onTogglePinned}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Tasks */}
      {todos.length > 0 && (
        <div>
          {overdueTodos.length > 0 && (
            <div className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Other Tasks
              </h2>
            </div>
          )}

          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
                onTogglePinned={onTogglePinned}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default TodoList;
