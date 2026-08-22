import TodoCard from "../TodoCard";
import { ClipboardList } from "lucide-react";

function TodoList({
  todos,
  totalTaskCount,
  searchTerm,
  filter,
  priorityFilter,
  onDelete,
  onToggle,
  onEdit,
  onTogglePinned,
}) {
  if (todos.length === 0) {
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
      <section className="rounded-3xl border border-dashed border-slate-700 bg-[#111827] py-20 text-center">
        <ClipboardList size={60} className="mx-auto mb-6 text-slate-500" />

        <h2 className="text-2xl font-semibold text-white">{title}</h2>

        <p className="mt-3 text-slate-400">{message}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
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
    </section>
  );
}

export default TodoList;
