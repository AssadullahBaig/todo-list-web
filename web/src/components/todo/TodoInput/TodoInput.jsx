function TodoInput() {
  return (
    <section className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
      />

      <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500">
        Add
      </button>
    </section>
  );
}

export default TodoInput;
