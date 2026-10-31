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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-[#27272a] bg-[#131316] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Productivity Overview
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Workspace Analytics
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {activeTasks === 0
                ? "All caught up! Excellent job clearing your sprint backlog."
                : `You have ${activeTasks} active task${activeTasks === 1 ? "" : "s"} across ${allLists.length} lists.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onNavigateToTasks}
              className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#131316] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <ListTodo size={14} />
              <span>View Tasks</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={onOpenNewTask}
              className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Tasks */}
        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition hover:border-zinc-700">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Tasks</span>
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
              <ListTodo size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{totalTasks}</span>
            <span className="text-[11px] text-zinc-500">recorded</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <CheckSquare size={12} className="text-zinc-500" />
            <span>Across all lists</span>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition hover:border-zinc-700">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">In Progress</span>
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{activeTasks}</span>
            <span className="text-[11px] text-zinc-500">pending</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <Calendar size={12} />
            <span>{dueTodayTasks.length} task(s) due today</span>
          </div>
        </div>

        {/* Completed Rate */}
        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition hover:border-zinc-700">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Completion</span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{completionRate}%</span>
            <span className="text-[11px] font-medium text-emerald-400">
              {completedTasks} of {totalTasks}
            </span>
          </div>
          <div className="mt-2.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full border border-[#27272a] bg-[#09090b]">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Overdue Attention */}
        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 transition hover:border-zinc-700">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Needs Attention</span>
            <div
              className={`rounded-lg p-2 ${overdueTasks.length > 0
                  ? "bg-rose-500/10 text-rose-400"
                  : "bg-zinc-800 text-zinc-400"
                }`}
            >
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${overdueTasks.length > 0 ? "text-rose-400" : "text-white"
                }`}
            >
              {overdueTasks.length}
            </span>
            <span className="text-[11px] text-zinc-500">overdue</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            {overdueTasks.length > 0 ? (
              <span className="text-rose-400">Requires attention</span>
            ) : (
              <span className="text-emerald-400">All tasks on track!</span>
            )}
          </div>
        </div>
      </div>

      {/* Middle Section: Priorities & Subtasks */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Priority Breakdown Card */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Priority Distribution
              </h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                Breakdown of tasks by urgency level
              </p>
            </div>
            <TrendingUp size={18} className="text-zinc-400" />
          </div>

          <div className="mt-5 space-y-3.5">
            {/* High */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  High Priority
                </span>
                <span className="text-zinc-400">
                  {highPriority.length} (
                  {totalTasks === 0
                    ? 0
                    : Math.round((highPriority.length / totalTasks) * 100)}
                  %)
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full border border-[#27272a] bg-[#09090b]">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0
                        ? 0
                        : (highPriority.length / totalTasks) * 100
                      }%`,
                  }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  Medium Priority
                </span>
                <span className="text-zinc-400">
                  {mediumPriority.length} (
                  {totalTasks === 0
                    ? 0
                    : Math.round((mediumPriority.length / totalTasks) * 100)}
                  %)
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full border border-[#27272a] bg-[#09090b]">
                <div
                  className="h-full rounded-full bg-zinc-400 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0
                        ? 0
                        : (mediumPriority.length / totalTasks) * 100
                      }%`,
                  }}
                />
              </div>
            </div>

            {/* Low */}
            <div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                  Low Priority
                </span>
                <span className="text-zinc-400">
                  {lowPriority.length} (
                  {totalTasks === 0
                    ? 0
                    : Math.round((lowPriority.length / totalTasks) * 100)}
                  %)
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full border border-[#27272a] bg-[#09090b]">
                <div
                  className="h-full rounded-full bg-zinc-600 transition-all duration-500"
                  style={{
                    width: `${totalTasks === 0
                        ? 0
                        : (lowPriority.length / totalTasks) * 100
                      }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pinned Tasks Summary */}
          {pinnedTasks.length > 0 && (
            <div className="mt-5 rounded-lg border border-[#27272a] bg-[#131316] p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>
                  {pinnedTasks.length} Pinned Priority Task
                  {pinnedTasks.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-1.5 space-y-1">
                {pinnedTasks.slice(0, 2).map((t) => (
                  <p key={t.id} className="truncate text-xs text-zinc-300">
                    • {t.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subtask Execution Card */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Subtask Progression
              </h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                Step-by-step deliverable completion
              </p>
            </div>
            <ListChecks size={18} className="text-zinc-400" />
          </div>

          <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-[#27272a] bg-[#131316] p-6 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-800">
              <span className="text-xl font-bold text-white">
                {subtaskRate}%
              </span>
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-200">
              {completedSubtasks} of {totalSubtasks} subtasks completed
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-500">
              Granular breakdown accelerates delivery time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Task Lists Workload */}
      <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              List Workload &amp; Distribution
            </h2>
            <p className="mt-0.5 text-xs text-zinc-400">
              Active load across all task categories
            </p>
          </div>
          <Folder size={18} className="text-zinc-400" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {listStats.map((item) => {
            const listRate =
              item.total === 0
                ? 0
                : Math.round((item.completed / item.total) * 100);

            return (
              <div
                key={item.name}
                className="rounded-lg border border-[#27272a] bg-[#131316] p-3.5 transition hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-semibold text-white">
                    {item.name}
                  </span>
                  <span className="rounded bg-zinc-800 px-1.5 py-0.2 text-[10px] font-medium text-zinc-400">
                    {item.total}
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{item.active} active</span>
                  <span>{listRate}% done</span>
                </div>

                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-300"
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

export default DashboardView;
