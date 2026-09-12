import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  Info,
  Plus,
  List,
  Inbox,
  Briefcase,
  BookOpen,
  User,
} from "lucide-react";

const taskLists = [
  { name: "All", label: "All Tasks", icon: List },
  { name: "Inbox", label: "Inbox", icon: Inbox },
  { name: "Work", label: "Work", icon: Briefcase },
  { name: "Study", label: "Study", icon: BookOpen },
  { name: "Personal", label: "Personal", icon: User },
];

function Sidebar({ onToggleForm, listFilter, onListFilterChange }) {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col justify-between border-r border-slate-800 bg-[#0F172A]">
      {/* Top Section */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="border-b border-slate-800 px-8 py-8">
          <h1 className="text-4xl font-bold tracking-tight text-violet-500">
            TaskFlow
          </h1>

          <p className="mt-2 text-sm text-slate-400">Premium Productivity</p>

          <span className="mt-3 inline-block rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-500">
            v1.9.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-8">
          <button
            className="
              flex w-full items-center gap-4 rounded-xl px-5 py-3
              text-slate-400
              transition-all duration-200
              hover:bg-slate-800 hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0F172A]
            "
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            className="
              flex w-full items-center gap-4 rounded-xl
              bg-gradient-to-r from-violet-700 to-violet-600
              px-5 py-3 font-semibold text-white
              shadow-lg shadow-violet-900/30
              transition-all duration-200
              hover:from-violet-600 hover:to-violet-500
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-400/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0F172A]
            "
          >
            <CheckSquare size={20} />
            <span>Todo</span>
          </button>

          <button
            className="
              flex w-full items-center gap-4 rounded-xl px-5 py-3
              text-slate-400
              transition-all duration-200
              hover:bg-slate-800 hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0F172A]
            "
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            className="
              flex w-full items-center gap-4 rounded-xl px-5 py-3
              text-slate-400
              transition-all duration-200
              hover:bg-slate-800 hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0F172A]
            "
          >
            <Info size={20} />
            <span>About</span>
          </button>
        </nav>

        {/* Task Lists */}
        <div className="px-4 pb-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Lists
          </p>

          <div className="space-y-1">
            {taskLists.map((taskList) => {
              const Icon = taskList.icon;
              const isActive = listFilter === taskList.name;

              return (
                <button
                  key={taskList.name}
                  type="button"
                  onClick={() => onListFilterChange(taskList.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-violet-500/10 font-medium text-violet-300"
                      : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60`}
                >
                  <Icon size={17} />
                  <span>{taskList.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800 p-5">
        <button
          onClick={onToggleForm}
          className="
            flex w-full items-center justify-center gap-3
            rounded-2xl
            bg-gradient-to-r from-violet-700 to-violet-500
            px-5 py-4 font-semibold text-white
            shadow-lg shadow-violet-900/30
            transition-all duration-200
            hover:scale-[1.02]
            hover:from-violet-600 hover:to-violet-400
            active:scale-[0.98]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-400/70
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0F172A]
          "
        >
          <Plus size={22} strokeWidth={2.8} />
          <span>New Task</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
