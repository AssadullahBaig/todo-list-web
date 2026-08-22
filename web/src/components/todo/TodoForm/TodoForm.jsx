function TodoForm({ newTodo, onInputChange, onSubmit, isEditing, onCancel }) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl shadow-black/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h2>

        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
          Fill in the details below to keep your work organized.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-slate-300"
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
            className="
              h-11 w-full rounded-xl
              border border-slate-700
              bg-[#1E293B] px-4
              text-sm text-white
              placeholder:text-slate-500
              outline-none
              transition-all duration-200
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={newTodo.description}
            onChange={onInputChange}
            placeholder="Describe your task..."
            className="
              w-full resize-none rounded-xl
              border border-slate-700
              bg-[#1E293B] px-4 py-3
              text-sm text-white
              placeholder:text-slate-500
              outline-none
              transition-all duration-200
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        {/* Date + Priority */}
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="dueDate"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={newTodo.dueDate}
              onChange={onInputChange}
              className="
                h-11 w-full rounded-xl
                border border-slate-700
                bg-[#1E293B] px-4
                text-sm text-white
                outline-none
                transition-all duration-200
                hover:border-slate-600
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
            />
          </div>

          <div>
            <label
              htmlFor="dueTime"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Time
            </label>

            <input
              id="dueTime"
              name="dueTime"
              type="time"
              value={newTodo.dueTime}
              onChange={onInputChange}
              className="
                h-11 w-full rounded-xl
                border border-slate-700
                bg-[#1E293B] px-4
                text-sm text-white
                outline-none
                transition-all duration-200
                hover:border-slate-600
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={newTodo.priority}
              onChange={onInputChange}
              className="
                h-11 w-full rounded-xl
                border border-slate-700
                bg-[#1E293B] px-4
                text-sm text-white
                outline-none
                transition-all duration-200
                hover:border-slate-600
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* Label */}
        <div>
          <label
            htmlFor="label"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Label
          </label>

          <select
            id="label"
            name="label"
            value={newTodo.label}
            onChange={onInputChange}
            className="
              h-11 w-full rounded-xl
              border border-slate-700
              bg-[#1E293B] px-4
              text-sm text-white
              outline-none
              transition
              hover:border-slate-600
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          >
            <option value="">No label</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Development">Development</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="
                rounded-xl border border-slate-700
                bg-transparent px-5 py-2.5
                text-sm font-medium text-slate-300
                transition
                hover:border-slate-600
                hover:bg-slate-800
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/60
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#111827]
              "
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="
              rounded-xl
              bg-gradient-to-r from-violet-700 to-violet-500
              px-7 py-2.5
              text-sm font-semibold text-white
              shadow-lg shadow-violet-900/30
              transition-all duration-200
              hover:scale-[1.02]
              hover:from-violet-600
              hover:to-violet-400
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-400/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#111827]
            "
          >
            {isEditing ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
