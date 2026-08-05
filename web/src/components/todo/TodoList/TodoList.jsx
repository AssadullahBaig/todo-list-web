import TodoCard from "../TodoCard";
import { ClipboardList } from "lucide-react";

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  if (todos.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-700 bg-[#111827] py-20 text-center">
        <ClipboardList size={60} className="mx-auto mb-6 text-slate-500" />

        <h2 className="text-2xl font-semibold text-white">No Tasks Found</h2>

        <p className="mt-3 text-slate-400">
          Try creating a new task or changing your search/filter.
        </p>
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
        />
      ))}
    </section>
  );
}

export default TodoList;
