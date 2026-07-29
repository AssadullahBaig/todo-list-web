function TodoForm({ newTodo, onInputChange }) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold text-white">Add New Task</h2>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-300"
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
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="3"
            value={newTodo.description}
            onChange={onInputChange}
            placeholder="Enter task description..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={newTodo.dueDate}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={newTodo.priority}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TodoForm;
