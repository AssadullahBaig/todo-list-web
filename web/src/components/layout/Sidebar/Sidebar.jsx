import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  Info,
  Plus,
} from "lucide-react";

function Sidebar({ onToggleForm }) {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col justify-between border-r border-slate-800 bg-[#0F172A]">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="border-b border-slate-800 px-8 py-8">
          <h1 className="text-4xl font-bold tracking-tight text-violet-500">
            TaskFlow
          </h1>

          <p className="mt-2 text-sm text-slate-400">Premium Productivity</p>

          <span className="mt-3 inline-block rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-500">
            v1.6.0
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
