import { useEffect, useState } from "react";
import { Check } from "lucide-react";

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
  const { id, title, description, dueDate, dueTime, priority, completed } =
    todo;

  const [isAnimating, setIsAnimating] = useState(false);
  const dueDateStatus = getDueDateStatus(dueDate);

  useEffect(() => {
    if (!completed) {
      setIsAnimating(false);
    }
  }, [completed]);

  function handleToggle() {
    if (!completed) {
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    }

    onToggle(id);
  }

  return (
    <article
      className={`
        relative overflow-hidden rounded-2xl border bg-slate-900 p-5 shadow
        transition-all duration-300
        ${
          completed
            ? "border-emerald-900/50 bg-slate-900/70"
            : "border-slate-800 hover:border-slate-700 hover:shadow-lg"
        }
        ${isAnimating ? "scale-[1.01] shadow-emerald-500/20" : ""}
      `}
    >
      {/* Completion flash */}
      <div
        className={`
          pointer-events-none absolute inset-0 bg-emerald-400/5
          transition-opacity duration-300
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          {/* Animated checkbox */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label={
              completed ? "Mark task as incomplete" : "Mark task as complete"
            }
            className={`
              relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center
              rounded-lg border
              transition-all duration-300
              ${
                completed
                  ? "scale-100 border-emerald-500 bg-emerald-500"
                  : "border-slate-600 bg-transparent hover:border-violet-500 hover:bg-violet-500/10"
              }
              ${isAnimating ? "scale-125" : ""}
            `}
          >
            {/* Glow */}
            <span
              className={`
                absolute inset-0 rounded-lg bg-emerald-400
                transition-all duration-500
                ${isAnimating ? "scale-150 opacity-30" : "scale-100 opacity-0"}
              `}
            />

            {/* Checkmark */}
            <Check
              size={15}
              strokeWidth={3}
              className={`
                relative z-10 text-white
                transition-all duration-300
                ${completed ? "scale-100 opacity-100" : "scale-50 opacity-0"}
              `}
            />
          </button>

          {/* Task content */}
          <div className="min-w-0">
            <h3
              className={`
                text-xl font-semibold
                transition-all duration-500
                ${
                  completed
                    ? "text-slate-500 line-through decoration-emerald-500 decoration-2"
                    : "text-white"
                }
              `}
            >
              {title}
            </h3>

            {description && (
              <p
                className={`
                  mt-2 transition-all duration-500
                  ${completed ? "text-slate-600" : "text-slate-400"}
                `}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`
              rounded-full px-3 py-1 text-sm font-medium
              ${
                priority === "High"
                  ? "bg-red-500/10 text-red-400"
                  : priority === "Medium"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-emerald-500/10 text-emerald-400"
              }
            `}
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

      {/* Metadata */}
      <div className="relative mt-5 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4 text-sm">
        <span
          className={`
            transition-colors duration-500
            ${completed ? "text-slate-600" : dueDateStatus.color}
          `}
        >
          {dueDateStatus.label}
        </span>

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

        {dueTime && (
          <>
            <span className="text-slate-700">•</span>

            <span className="text-slate-500">
              {new Date(`1970-01-01T${dueTime}`).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </>
        )}
      </div>
    </article>
  );
}

export default TodoCard;
