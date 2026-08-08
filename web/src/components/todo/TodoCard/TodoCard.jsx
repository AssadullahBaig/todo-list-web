function getDueDateStatus(dueDate) {
  if (!dueDate) {
    return {
      label: "No due date",
      color: "text-slate-500",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${dueDate}T00:00:00`);
  due.setHours(0, 0, 0, 0);

  const differenceInTime = due.getTime() - today.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24));

  if (differenceInDays < 0) {
    return {
      label: "Overdue",
      color: "text-red-400",
    };
  }

  if (differenceInDays === 0) {
    return {
      label: "Due today",
      color: "text-blue-400",
    };
  }

  if (differenceInDays === 1) {
    return {
      label: "Due tomorrow",
      color: "text-yellow-400",
    };
  }

  return {
    label: `Due in ${differenceInDays} days`,
    color: "text-emerald-400",
  };
}

function TodoCard({ todo, onDelete, onToggle, onEdit }) {
  const { id, title, description, dueDate, priority, completed } = todo;

  const dueDateStatus = getDueDateStatus(dueDate);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow transition-all duration-200 hover:border-slate-700 hover:shadow-lg">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
            className="mt-1 h-5 w-5 cursor-pointer accent-violet-600"
          />

          <div>
            <h3
              className={`text-xl font-semibold ${
                completed ? "text-slate-500 line-through" : "text-white"
              }`}
            >
              {title}
            </h3>

            {description && (
              <p className="mt-2 text-slate-400">{description}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              priority === "High"
                ? "bg-red-500/10 text-red-400"
                : priority === "Medium"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {priority}
          </span>

          <button
            type="button"
            onClick={() => onEdit(todo)}
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-500"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-4 text-sm">
        <span className={dueDateStatus.color}>{dueDateStatus.label}</span>

        {dueDate && (
          <>
            <span className="text-slate-700">•</span>

            <span className="text-slate-500">
              {new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </>
        )}
      </div>
    </article>
  );
}

export default TodoCard;
