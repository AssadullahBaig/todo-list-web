import { useState } from "react";
import {
  Check,
  ListChecks,
  NotebookPen,
  Repeat2,
  Star,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";

function getDueDateStatus(dueDate, dueTime) {
  if (!dueDate) {
    return {
      label: "No due date",
      color: "text-zinc-500",
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
      color: "text-rose-400",
    };
  }

  if (differenceInDays === 0) {
    return {
      label: "Today",
      color: "text-zinc-300",
    };
  }

  if (differenceInDays === 1) {
    return {
      label: "Tomorrow",
      color: "text-zinc-300",
    };
  }

  if (differenceInDays > 1 && differenceInDays <= 7) {
    return {
      label: `In ${differenceInDays} days`,
      color: "text-zinc-400",
    };
  }

  return {
    label: `${dueDate}`,
    color: "text-zinc-400",
  };
}

function getPriorityBadge(priority, completed) {
  if (completed) {
    return (
      <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
        Done
      </span>
    );
  }

  switch (priority) {
    case "High":
      return (
        <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
          High
        </span>
      );
    case "Medium":
      return (
        <span className="rounded border border-[#27272a] bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300">
          Medium
        </span>
      );
    case "Low":
    default:
      return (
        <span className="rounded border border-[#27272a] bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          Low
        </span>
      );
  }
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
    list,
    label,
    recurrence,
  } = todo;

  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [areSubtasksVisible, setAreSubtasksVisible] = useState(false);

  const subtasks = todo.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;

  const dueDateStatus = getDueDateStatus(dueDate, dueTime);

  function handleToggleCheckbox() {
    onToggle(id);
  }

  return (
    <article
      className={`task-card group relative rounded-xl border border-[#27272a] transition-all ${
        completed
          ? "bg-[#131316] opacity-60"
          : "bg-[#18181b] hover:border-zinc-700 hover:bg-[#201f22]"
      }`}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3.5 p-4">
        {/* Checkbox (or Selection Checkbox) */}
        {isSelectionMode ? (
          <button
            type="button"
            onClick={() => onToggleSelection(id)}
            aria-label={isSelected ? "Unselect task" : "Select task"}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
              isSelected
                ? "border-white bg-white text-zinc-950"
                : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
            }`}
          >
            {isSelected && <Check size={13} strokeWidth={3} />}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleToggleCheckbox}
            aria-label={completed ? "Mark incomplete" : "Mark complete"}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
              completed
                ? "border-emerald-500 bg-emerald-500 text-zinc-950"
                : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
            }`}
          >
            {completed && <Check size={13} strokeWidth={3} />}
          </button>
        )}

        {/* Content & Metadata */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
          {/* Title & Tags */}
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <h3
              className={`text-sm font-medium truncate ${
                completed ? "text-zinc-500 line-through" : "text-white"
              }`}
            >
              {title}
            </h3>

            {/* List / Category Badge */}
            <span className="rounded border border-[#27272a] bg-[#18181b] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {list || "Inbox"}
            </span>

            {/* Custom Label Tag */}
            {label && (
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                {label}
              </span>
            )}

            {/* Recurrence Indicator */}
            {recurrence && recurrence !== "none" && (
              <span className="inline-flex items-center gap-1 rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                <Repeat2 size={11} />
                <span>{recurrence}</span>
              </span>
            )}
          </div>

          {/* Right Metadata & Action Buttons */}
          <div className="flex shrink-0 items-center justify-end">
            {/* Badges Container - stays flush right and slides left on hover */}
            <div className="flex items-center gap-2.5 transition-transform duration-300 ease-in-out">
              {/* Priority Badge */}
              {getPriorityBadge(priority, completed)}

              {/* Due Date Indicator */}
              <div className={`flex items-center gap-1.5 text-xs ${dueDateStatus.color}`}>
                <Calendar size={14} className="text-zinc-500" />
                <span>{dueDateStatus.label}</span>
              </div>

              {/* Category / User Initials Circle */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#27272a] bg-zinc-800 text-[11px] font-semibold text-zinc-300">
                {(list || "T")[0].toUpperCase()}
              </div>
            </div>

            {/* Action Buttons - smoothly slides in from right on hover */}
            <div className="flex items-center gap-1 max-w-0 opacity-0 overflow-hidden pointer-events-none transition-all duration-300 ease-in-out group-hover:max-w-[220px] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:ml-3">
              {/* Pin Button */}
              <button
                type="button"
                onClick={() => onTogglePinned(id)}
                className={`rounded p-1 transition-colors shrink-0 ${
                  pinned ? "text-amber-400" : "text-zinc-500 hover:text-amber-400"
                }`}
                title={pinned ? "Unpin task" : "Pin task"}
              >
                <Star size={15} className={pinned ? "fill-amber-400" : ""} />
              </button>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => onEdit(todo)}
                className="rounded p-1 text-zinc-500 transition-colors hover:text-white shrink-0"
                title="Edit task"
              >
                <Pencil size={15} />
              </button>

              {/* Notes Toggle Button */}
              {notes && (
                <button
                  type="button"
                  onClick={() => setAreNotesVisible((prev) => !prev)}
                  className={`rounded p-1 transition-colors shrink-0 ${
                    areNotesVisible ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                  title="View notes"
                >
                  <NotebookPen size={15} />
                </button>
              )}

              {/* Subtasks Toggle Button */}
              {subtasks.length > 0 && (
                <button
                  type="button"
                  onClick={() => setAreSubtasksVisible((prev) => !prev)}
                  className={`flex items-center gap-1 rounded p-1 transition-colors shrink-0 ${
                    areSubtasksVisible ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                  title="View subtasks"
                >
                  <ListChecks size={15} />
                  <span className="text-[10px] text-zinc-400">
                    {completedSubtasks}/{subtasks.length}
                  </span>
                </button>
              )}

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => onDelete(id)}
                className="rounded p-1 text-zinc-500 transition-colors hover:text-rose-400 shrink-0"
                title="Delete task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Line (if present) */}
      {description && !completed && (
        <div className="border-t border-[#27272a]/60 px-4 py-2 text-xs text-zinc-400">
          <p>{description}</p>
        </div>
      )}

      {/* Expandable Notes Drawer */}
      {areNotesVisible && notes && (
        <div className="border-t border-[#27272a] bg-[#131316] p-4 text-xs text-zinc-300">
          <p className="font-semibold text-zinc-400 mb-1">Notes:</p>
          <p className="whitespace-pre-line leading-relaxed">{notes}</p>
        </div>
      )}

      {/* Expandable Subtasks Checklist */}
      {areSubtasksVisible && subtasks.length > 0 && (
        <div className="border-t border-[#27272a] bg-[#131316] p-4">
          <div className="mb-2.5 flex items-center justify-between text-xs font-medium text-zinc-400">
            <span>Subtasks ({completedSubtasks}/{subtasks.length})</span>
            <span>{Math.round((completedSubtasks / subtasks.length) * 100)}%</span>
          </div>

          <div className="space-y-1.5">
            {subtasks.map((subtask) => (
              <label
                key={subtask.id}
                className="flex items-center gap-2.5 rounded-lg bg-[#18181b] px-3 py-1.5 text-xs text-zinc-300 hover:bg-[#201f22] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => onToggleSubtask(id, subtask.id)}
                  className="h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-0"
                />
                <span className={subtask.completed ? "line-through text-zinc-500" : ""}>
                  {subtask.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default TodoCard;
