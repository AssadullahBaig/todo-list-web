import { useEffect, useState } from "react";
import { Check, Star } from "lucide-react";

function getDueDateStatus(dueDate, dueTime) {
  if (!dueDate) {
    return {
      label: "No due date",
      color: "text-slate-500",
    };
  }

  const now = new Date();

  const [year, month, day] = dueDate.split("-").map(Number);

  const due = new Date(year, month - 1, day);

  if (dueTime) {
    const [hours, minutes] = dueTime.split(":").map(Number);
    due.setHours(hours, minutes, 0, 0);
  } else {
    due.setHours(23, 59, 59, 999);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDay = new Date(year, month - 1, day);
  dueDay.setHours(0, 0, 0, 0);

  const differenceInTime = dueDay.getTime() - today.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24));

  // The actual deadline has passed
  if (due < now) {
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

function TodoCard({ todo, onDelete, onToggle, onEdit, onTogglePinned }) {
  const {
    id,
    title,
    description,
    dueDate,
    dueTime,
    priority,
    completed,
    pinned,
  } = todo;

  const [isAnimating, setIsAnimating] = useState(false);

  const dueDateStatus = getDueDateStatus(dueDate, dueTime);

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
        relative overflow-hidden rounded-xl border
        bg-slate-900 px-4 py-3
        shadow-sm
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
          pointer-events-none absolute inset-0
          bg-emerald-400/5
          transition-opacity duration-300
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
      />

      <div className="relative flex items-center gap-3">
        {/* Animated checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={
            completed ? "Mark task as incomplete" : "Mark task as complete"
          }
          className={`
            relative flex h-5 w-5 shrink-0
            items-center justify-center
            rounded-md border
            transition-all duration-300
            ${
              completed
                ? "border-emerald-500 bg-emerald-500"
                : "border-slate-600 bg-transparent hover:border-violet-500 hover:bg-violet-500/10"
            }
            ${isAnimating ? "scale-125" : ""}
          `}
        >
          {/* Glow */}
          <span
            className={`
              absolute inset-0 rounded-md
              bg-emerald-400
              transition-all duration-500
              ${isAnimating ? "scale-150 opacity-30" : "scale-100 opacity-0"}
            `}
          />

          {/* Checkmark */}
          <Check
            size={13}
            strokeWidth={3}
            className={`
              relative z-10 text-white
              transition-all duration-300
              ${completed ? "scale-100 opacity-100" : "scale-50 opacity-0"}
            `}
          />
        </button>

        {/* Task content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3
              className={`
                truncate text-base font-semibold
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

            {/* Priority */}
            <span
              className={`
                shrink-0 rounded-full
                px-2.5 py-0.5
                text-xs font-medium
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
          </div>

          {/* Description */}
          {description && (
            <p
              className={`
                mt-0.5 truncate text-sm
                transition-all duration-500
                ${completed ? "text-slate-600" : "text-slate-500"}
              `}
            >
              {description}
            </p>
          )}
        </div>

        {/* Due information */}
        <div className="hidden shrink-0 items-center gap-2 text-xs sm:flex">
          <span
            className={`
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
                })}
              </span>
            </>
          )}

          {dueTime && (
            <>
              <span className="text-slate-700">•</span>

              <span className="text-slate-500">
                {new Date(`1970-01-01T${dueTime}`).toLocaleTimeString(
                  undefined,
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  },
                )}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <button
          type="button"
          onClick={() => onTogglePinned(id)}
          aria-label={pinned ? "Unpin task" : "Pin task"}
          className={`rounded-lg p-2 transition ${
            pinned
              ? "text-yellow-400 hover:bg-yellow-400/10"
              : "text-slate-500 hover:bg-slate-800 hover:text-yellow-400"
          }`}
        >
          <Star size={18} fill={pinned ? "currentColor" : "none"} />
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            className="
              rounded-lg px-2.5 py-1.5
              text-xs font-medium
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="
              rounded-lg px-2.5 py-1.5
              text-xs font-medium
              text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            Delete
          </button>
        </div>
      </div>

      {/* Mobile metadata */}
      <div className="relative mt-2 flex items-center gap-2 text-xs sm:hidden">
        <span className={completed ? "text-slate-600" : dueDateStatus.color}>
          {dueDateStatus.label}
        </span>

        {dueDate && (
          <>
            <span className="text-slate-700">•</span>

            <span className="text-slate-500">
              {new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
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
