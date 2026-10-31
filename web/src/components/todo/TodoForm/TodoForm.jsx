import { Plus, Trash2 } from "lucide-react";

function TodoForm({
  newTodo,
  onInputChange,
  onAddSubtask,
  onSubtaskChange,
  onRemoveSubtask,
  onSubmit,
  isEditing,
  onCancel,
  availableLists = ["Inbox", "Work", "Study", "Personal"],
}) {
  return (
    <section className="mb-6 rounded-2xl border border-[#27272a] bg-[#18181b] p-6 shadow-xl">
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-white">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h2>

        <p className="mt-1 text-xs text-zinc-400">
          Fill in the details below to keep your work organized in Linear Zinc style.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-xs font-medium text-zinc-300"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={newTodo.title}
            onChange={onInputChange}
            placeholder="Enter task title..."
            className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-xs font-medium text-zinc-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={3}
            value={newTodo.description}
            onChange={onInputChange}
            placeholder="Describe your task..."
            className="w-full resize-none rounded-lg border border-[#27272a] bg-[#131316] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-1 block text-xs font-medium text-zinc-300"
          >
            Notes / Context
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={2}
            value={newTodo.notes}
            onChange={onInputChange}
            placeholder="Add extra details, reminders, or context..."
            className="w-full resize-none rounded-lg border border-[#27272a] bg-[#131316] px-3.5 py-2 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Subtasks */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-300">Subtasks</p>
              <p className="text-[11px] text-zinc-500">Break this task into smaller steps.</p>
            </div>

            <button
              type="button"
              onClick={onAddSubtask}
              className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#131316] px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <Plus size={14} />
              <span>Add Subtask</span>
            </button>
          </div>

          <div className="space-y-2">
            {(newTodo.subtasks || []).map((subtask, index) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={subtask.title}
                  onChange={(e) => onSubtaskChange(subtask.id, e.target.value)}
                  placeholder={`Step ${index + 1}...`}
                  className="h-9 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-zinc-500"
                />
                <button
                  type="button"
                  onClick={() => onRemoveSubtask(subtask.id)}
                  className="rounded p-2 text-zinc-500 transition-colors hover:text-rose-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Date, Time, Priority */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="dueDate"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={newTodo.dueDate}
              onChange={onInputChange}
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="dueTime"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Time
            </label>
            <input
              id="dueTime"
              name="dueTime"
              type="time"
              value={newTodo.dueTime}
              onChange={onInputChange}
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={newTodo.priority}
              onChange={onInputChange}
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white outline-none focus:border-zinc-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Task List, Label & Repeat */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="list"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Task List
            </label>
            <select
              id="list"
              name="list"
              value={newTodo.list}
              onChange={onInputChange}
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white outline-none focus:border-zinc-500"
            >
              {availableLists.map((listName) => (
                <option key={listName} value={listName}>
                  {listName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="label"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Label / Tag
            </label>
            <input
              id="label"
              name="label"
              type="text"
              value={newTodo.label}
              onChange={onInputChange}
              placeholder="e.g. Frontend, API..."
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="recurrence"
              className="mb-1 block text-xs font-medium text-zinc-300"
            >
              Repeat
            </label>
            <select
              id="recurrence"
              name="recurrence"
              value={newTodo.recurrence || "none"}
              onChange={onInputChange}
              className="h-10 w-full rounded-lg border border-[#27272a] bg-[#131316] px-3 text-xs text-white outline-none focus:border-zinc-500"
            >
              <option value="none">Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#27272a] bg-transparent px-5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-white px-6 py-2 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            {isEditing ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
