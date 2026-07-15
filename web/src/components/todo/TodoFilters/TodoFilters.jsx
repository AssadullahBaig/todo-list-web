function TodoFilters() {
  return (
    <section className="mb-8 flex gap-3">
      <button className="rounded-full bg-violet-600 px-5 py-2 text-white">
        All
      </button>

      <button className="rounded-full bg-slate-800 px-5 py-2 text-slate-300">
        Active
      </button>

      <button className="rounded-full bg-slate-800 px-5 py-2 text-slate-300">
        Completed
      </button>
    </section>
  );
}

export default TodoFilters;
