import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ListChecks,
  NotebookPen,
  Repeat2,
  Star,
} from "lucide-react";

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

function getRecurrenceLabel(recurrence, dueDate) {
  if (!recurrence || recurrence === "none") {
    return "";
  }

  if (recurrence === "daily") {
    return "Every day";
  }

  if (recurrence === "weekly") {
    if (!dueDate) {
      return "Every week";
    }

    const dayName = new Date(`${dueDate}T00:00:00`).toLocaleDateString(
      undefined,
      {
        weekday: "long",
      },
    );

    return `Every ${dayName}`;
  }

  if (recurrence === "monthly") {
    if (!dueDate) {
      return "Every month";
    }

    const day = Number(dueDate.split("-")[2]);

    return `Every month on day ${day}`;
  }

  return "";
}

function TodoCard({
  todo,
  onDelete,
  onToggle,
  onEdit,
  onTogglePinned,
  isSelectionMode,
  isSelected,
  onToggleSelection,
  onToggleSubtask,
}) {
  const {
    id,
    title,
    description,
    notes,
    dueDate,
    dueTime,
    priority,
    completed,
    pinned,
    label,
    recurrence,
  } = todo;

  const [isAnimating, setIsAnimating] = useState(false);
  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [areSubtasksVisible, setAreSubtasksVisible] = useState(false);

  const subtasks = todo.subtasks || [];

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  const subtaskPercentage =
    subtasks.length === 0
      ? 0
      : Math.round((completedSubtasks / subtasks.length) * 100);

  const dueDateStatus = getDueDateStatus(dueDate, dueTime);

  const recurrenceLabel = getRecurrenceLabel(recurrence, dueDate);

  const displayStatus = completed
    ? {
        label: "Completed",
        color: "text-emerald-400",
      }
    : dueDateStatus;

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
        ${
          isSelectionMode && isSelected
            ? "border-violet-500/60 bg-violet-500/5"
            : ""
        }
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
        {/* Single checkbox */}
        {isSelectionMode ? (
          <button
            type="button"
            onClick={() => onToggleSelection(id)}
            aria-label={isSelected ? "Unselect task" : "Select task"}
            className={`
              flex h-5 w-5 shrink-0
              items-center justify-center
              rounded-md border
              transition-all duration-200
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-900
              ${
                isSelected
                  ? "border-violet-500 bg-violet-600"
                  : "border-slate-600 bg-transparent hover:border-violet-500 hover:bg-violet-500/10"
              }
            `}
          >
            <Check
              size={13}
              strokeWidth={3}
              className={`text-white transition-all duration-200 ${
                isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </button>
        ) : (
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
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-900
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
        )}

        {/* Task content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3
              className={`
                truncate text-[15px] font-semibold leading-5 tracking-tight
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

            {label && (
              <span className="shrink-0 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                {label}
              </span>
            )}

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
                mt-0.5 truncate text-xs leading-5
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
          <span className={displayStatus.color}>{displayStatus.label}</span>

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

          {recurrenceLabel && (
            <>
              <span className="text-slate-700">•</span>

              <span className="flex items-center gap-1 text-violet-400">
                <Repeat2 size={13} />
                {recurrenceLabel}
              </span>
            </>
          )}
        </div>

        {/* Individual task actions */}
        {!isSelectionMode && (
          <>
            {/* Pin */}
            <button
              type="button"
              onClick={() => onTogglePinned(id)}
              aria-label={pinned ? "Unpin task" : "Pin task"}
              className={`
                rounded-lg p-2
                transition
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-yellow-400/60
                focus-visible:ring-offset-2
                focus-visible:ring-offset-slate-900
                ${
                  pinned
                    ? "text-yellow-400 hover:bg-yellow-400/10"
                    : "text-slate-500 hover:bg-slate-800 hover:text-yellow-400"
                }
              `}
            >
              <Star size={18} fill={pinned ? "currentColor" : "none"} />
            </button>

            {/* Actions */}
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
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-500/60
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-900
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
                  hover:text-red-300
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500/60
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-900
                "
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile metadata */}
      <div className="relative mt-2 flex items-center gap-2 text-xs sm:hidden">
        <span className={displayStatus.color}>{displayStatus.label}</span>

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

        {recurrenceLabel && (
          <>
            <span className="text-slate-700">•</span>

            <span className="flex items-center gap-1 text-violet-400">
              <Repeat2 size={13} />
              {recurrenceLabel}
            </span>
          </>
        )}
      </div>

      {/* Notes */}
      {!isSelectionMode && notes && (
        <div className="relative mt-3 border-t border-slate-800 pt-3">
          <button
            type="button"
            onClick={() => setAreNotesVisible((previous) => !previous)}
            className="
              flex w-full items-center justify-between gap-4
              rounded-lg px-1 py-1
              text-left
              transition
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <NotebookPen size={15} className="shrink-0 text-violet-400" />

              <span className="text-xs font-medium text-slate-400">
                Task notes
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                areNotesVisible ? "rotate-180" : ""
              }`}
            />
          </button>

          {areNotesVisible && (
            <div className="mt-3 rounded-lg bg-slate-950/40 px-3 py-2.5">
              <p
                className={`whitespace-pre-wrap text-xs leading-5 ${
                  completed ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtasks */}
      {!isSelectionMode && subtasks.length > 0 && (
        <div className="relative mt-3 border-t border-slate-800 pt-3">
          <button
            type="button"
            onClick={() => setAreSubtasksVisible((previous) => !previous)}
            className="
              flex w-full items-center justify-between gap-4
              rounded-lg px-1 py-1
              text-left
              transition
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
            "
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <ListChecks size={15} className="shrink-0 text-violet-400" />

              <span className="text-xs font-medium text-slate-400">
                {completedSubtasks} of {subtasks.length} subtasks
              </span>

              <div className="h-1.5 min-w-[60px] flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all duration-300"
                  style={{ width: `${subtaskPercentage}%` }}
                />
              </div>
            </div>

            <ChevronDown
              size={16}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                areSubtasksVisible ? "rotate-180" : ""
              }`}
            />
          </button>

          {areSubtasksVisible && (
            <div className="mt-3 space-y-2">
              {subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 rounded-lg bg-slate-950/40 px-3 py-2"
                >
                  <button
                    type="button"
                    onClick={() => onToggleSubtask(id, subtask.id)}
                    aria-label={
                      subtask.completed
                        ? "Mark subtask as incomplete"
                        : "Mark subtask as complete"
                    }
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center
                      rounded border
                      transition
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-violet-500/60
                      ${
                        subtask.completed
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600 hover:border-violet-500"
                      }
                    `}
                  >
                    <Check
                      size={11}
                      strokeWidth={3}
                      className={`text-white ${
                        subtask.completed ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>

                  <span
                    className={`min-w-0 truncate text-xs ${
                      subtask.completed
                        ? "text-slate-600 line-through"
                        : "text-slate-400"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default TodoCard;
