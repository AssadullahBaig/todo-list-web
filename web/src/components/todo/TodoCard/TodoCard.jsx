function TodoCard({ todo }) {
  const { title, description, dueDate, priority, completed } = todo;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`text-xl font-semibold ${
              completed ? "line-through text-slate-500" : "text-white"
            }`}
          >
            {title}
          </h3>

          <p className="mt-2 text-slate-400">{description}</p>
        </div>

        <span className="rounded-full bg-violet-600 px-3 py-1 text-sm text-white">
          {priority}
        </span>
      </div>

      <div className="mt-4 text-sm text-slate-500">Due: {dueDate}</div>
    </article>
  );
}

export default TodoCard;
