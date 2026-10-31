import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Folder,
  Calendar,
  ListTodo,
  CheckSquare,
  ArrowRight,
  Plus,
  Star,
  ListChecks,
} from "lucide-react";

function DashboardView({
  todos = [],
  customLists = [],
  onNavigateToTasks,
  onOpenNewTask,
  isTaskOverdue,
}) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Overdue & today calculations
  const today = new Date();
  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const overdueTasks = todos.filter((t) => isTaskOverdue(t));
  const dueTodayTasks = todos.filter(
    (t) => !t.completed && t.dueDate === todayDate
  );
  const pinnedTasks = todos.filter((t) => t.pinned && !t.completed);

  // Priorities
  const highPriority = todos.filter((t) => t.priority === "High");
  const mediumPriority = todos.filter((t) => t.priority === "Medium");
  const lowPriority = todos.filter((t) => t.priority === "Low");

  // Subtasks progress
  const allSubtasks = todos.flatMap((t) => t.subtasks || []);
  const totalSubtasks = allSubtasks.length;
  const completedSubtasks = allSubtasks.filter((s) => s.completed).length;
  const subtaskRate =
    totalSubtasks === 0
      ? 0
      : Math.round((completedSubtasks / totalSubtasks) * 100);

  // List breakdown
  const defaultListNames = ["Inbox", "Work", "Study", "Personal"];
  const allLists = [...defaultListNames, ...customLists];
  const listStats = allLists.map((listName) => {
    const listTasks = todos.filter((t) => (t.list || "Inbox") === listName);
    const completed = listTasks.filter((t) => t.completed).length;
    return {
      name: listName,
      total: listTasks.length,
      completed,
      active: listTasks.length - completed,
    };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-violet-950/40 via-[#111827] to-[#111827] p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
              <SparklesIcon size={14} /> Productivity Analytics
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome to Your Dashboard
            </h1>
            <p className="mt-2 text-base text-slate-400">
              {activeTasks === 0
                ? "All caught up! Excellent job clearing your tasks."
                : `You have ${activeTasks} active task${activeTasks === 1 ? "" : "s"} across ${allLists.length} lists.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToTasks}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
            >
              <ListTodo size={17} />
              <span>View All Tasks</span>
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={onOpenNewTask}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-violet-400"
            >
              <Plus size={17} strokeWidth={2.5} />
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Tasks */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm transition hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Total Tasks</span>
            <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400">
              <ListTodo size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalTasks}</span>
            <span className="text-xs text-slate-500">recorded</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <CheckSquare size={13} className="text-violet-400" />
            <span>Across all lists & categories</span>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm transition hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">In Progress</span>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{activeTasks}</span>
            <span className="text-xs text-slate-500">pending</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
            <Calendar size={13} />
            <span>{dueTodayTasks.length} task(s) due today</span>
          </div>
        </div>

        {/* Completed Rate */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm transition hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Completion</span>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{completionRate}%</span>
            <span className="text-xs text-emerald-400 font-medium">
              {completedTasks} of {totalTasks}
            </span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Overdue Attention */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm transition hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Needs Attention</span>
            <div className={`rounded-xl p-2.5 ${overdueTasks.length > 0 ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-slate-400"}`}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${overdueTasks.length > 0 ? "text-rose-400" : "text-white"}`}>
              {overdueTasks.length}
            </span>
            <span className="text-xs text-slate-500">overdue</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            {overdueTasks.length > 0 ? (
              <span className="text-rose-400">Requires your focus</span>
            ) : (
              <span className="text-emerald-400">All tasks are on schedule!</span>
            )}
          </div>
        </div>
      </div>

      {/* Middle Section: Priorities & Subtasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Priority Breakdown Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Priority Distribution</h2>
              <p className="text-xs text-slate-400 mt-1">Breakdown of tasks by urgency level</p>
            </div>
            <TrendingUp size={20} className="text-violet-400" />
          </div>

          <div className="mt-6 space-y-4">
            {/* High */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  High Priority
                </span>
                <span className="text-slate-400">
                  {highPriority.length} task{highPriority.length === 1 ? "" : "s"} ({totalTasks === 0 ? 0 : Math.round((highPriority.length / totalTasks) * 100)}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0 ? 0 : (highPriority.length / totalTasks) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Medium Priority
                </span>
                <span className="text-slate-400">
                  {mediumPriority.length} task{mediumPriority.length === 1 ? "" : "s"} ({totalTasks === 0 ? 0 : Math.round((mediumPriority.length / totalTasks) * 100)}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0 ? 0 : (mediumPriority.length / totalTasks) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Low */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-blue-400">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Low Priority
                </span>
                <span className="text-slate-400">
                  {lowPriority.length} task{lowPriority.length === 1 ? "" : "s"} ({totalTasks === 0 ? 0 : Math.round((lowPriority.length / totalTasks) * 100)}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0 ? 0 : (lowPriority.length / totalTasks) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pinned Tasks Summary */}
          {pinnedTasks.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-800/80 bg-[#1E293B]/40 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{pinnedTasks.length} Pinned Priority Task{pinnedTasks.length === 1 ? "" : "s"}</span>
              </div>
              <div className="mt-2 space-y-1">
                {pinnedTasks.slice(0, 2).map((t) => (
                  <p key={t.id} className="truncate text-xs text-slate-300">
                    • {t.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subtask Execution Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Subtask Progression</h2>
              <p className="text-xs text-slate-400 mt-1">Granular step completion performance</p>
            </div>
            <ListChecks size={20} className="text-violet-400" />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-800/60 bg-[#0F172A]/80 p-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-violet-500/20">
              <span className="text-2xl font-bold text-white">{subtaskRate}%</span>
              <div
                className="absolute inset-0 rounded-full border-4 border-violet-500"
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${subtaskRate}% 0%, 100% 100%)`,
                }}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-200">
              {completedSubtasks} of {totalSubtasks} subtasks checked off
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Breaking big tasks into steps boosts completion speed.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Task Lists Health */}
      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">List Workload & Distribution</h2>
            <p className="text-xs text-slate-400 mt-1">Status across all categories</p>
          </div>
          <Folder size={20} className="text-violet-400" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {listStats.map((item) => {
            const listRate =
              item.total === 0 ? 0 : Math.round((item.completed / item.total) * 100);

            return (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-800 bg-[#1E293B]/40 p-4 transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white truncate">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400 font-medium">
                    {item.total}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.active} active</span>
                  <span>{listRate}% complete</span>
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-300"
                    style={{ width: `${listRate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export default DashboardView;
