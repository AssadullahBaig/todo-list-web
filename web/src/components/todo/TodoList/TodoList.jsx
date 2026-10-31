import TodoCard from "../TodoCard";
import { AlertTriangle, ClipboardList } from "lucide-react";

function TodoList({
  todos,
  overdueTodos,
  totalTaskCount,
  searchTerm,
  filter,
  priorityFilter,
  taskView,
  listFilter,
  onClearFilters,
  onDelete,
  onToggle,
  onEdit,
  onTogglePinned,
  isSelectionMode,
  selectedTodoIds,
  onToggleSelection,
  onToggleSubtask,
}) {
  const hasNoVisibleTasks = todos.length === 0 && overdueTodos.length === 0;

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    filter !== "All" ||
    (priorityFilter && priorityFilter !== "All") ||
    taskView !== "all" ||
    listFilter !== "All";

  if (hasNoVisibleTasks) {
    let title = "No Tasks Found";
    let message = "Try changing your search or filters.";

    if (totalTaskCount === 0) {
      title = "No Tasks Yet";
      message = "Create your first task to get started.";
    } else if (searchTerm.trim() !== "") {
      title = "No Matching Tasks";
      message = `No tasks match "${searchTerm.trim()}".`;
    } else if (filter === "Active") {
      title = "No Active Tasks";
      message = "You're all caught up!";
    } else if (filter === "Completed") {
      title = "No Completed Tasks";
      message = "Complete a task and it will appear here.";
    } else if (taskView === "today") {
      title = "No Tasks Due Today";
      message = "You have no tasks due today.";
    } else if (taskView === "upcoming") {
      title = "No Upcoming Tasks";
      message = "You have no future tasks scheduled.";
    } else if (listFilter !== "All") {
      title = `No ${listFilter} Tasks`;
      message = `No tasks are assigned to ${listFilter}.`;
    }

    return (
      <section className="rounded-2xl border border-dashed border-[#27272a] bg-[#18181b] py-16 text-center">
        <ClipboardList size={44} className="mx-auto mb-4 text-zinc-500" />

        <h2 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-1.5 text-xs text-zinc-400">{message}</p>

        {totalTaskCount > 0 && hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Clear Filters
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Overdue Tasks Banner */}
      {overdueTodos.length > 0 && (
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-rose-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Overdue
              </h2>
            </div>

            <span className="text-[11px] text-zinc-500">
              {overdueTodos.length}{" "}
              {overdueTodos.length === 1 ? "task needs" : "tasks need"} attention
            </span>
          </div>

          <div className="space-y-2.5">
            {overdueTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
                onTogglePinned={onTogglePinned}
                isSelectionMode={isSelectionMode}
                isSelected={selectedTodoIds.includes(todo.id)}
                onToggleSelection={onToggleSelection}
                onToggleSubtask={onToggleSubtask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Tasks List */}
      {todos.length > 0 && (
        <div className="space-y-2.5">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
              onTogglePinned={onTogglePinned}
              isSelectionMode={isSelectionMode}
              isSelected={selectedTodoIds.includes(todo.id)}
              onToggleSelection={onToggleSelection}
              onToggleSubtask={onToggleSubtask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
