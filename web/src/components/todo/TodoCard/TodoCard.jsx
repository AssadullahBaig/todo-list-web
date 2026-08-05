import { CalendarDays, Pencil, Trash2 } from "lucide-react";

function TodoCard({ todo, onDelete, onToggle, onEdit }) {
  const { id, title, description, dueDate, priority, completed } = todo;

  function getPriorityStyle() {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-300 border-red-500/30";

      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";

      case "Low":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";

      default:
        return "bg-violet-500/20 text-violet-300 border-violet-500/30";
    }
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-[#111827] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20">
      <div className="flex items-start gap-5">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="mt-1 h-5 w-5 cursor-pointer accent-violet-600"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h3
                className={`text-xl font-semibold ${
                  completed ? "text-slate-500 line-through" : "text-white"
                }`}
              >
                {title}
              </h3>

              <p className="mt-3 text-slate-400">{description}</p>
            </div>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityStyle()}`}
            >
              {priority}
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarDays size={16} />

              <span>{dueDate}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(todo)}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-blue-600 hover:text-white"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => onDelete(id)}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TodoCard;
