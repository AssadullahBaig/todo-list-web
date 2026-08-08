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
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-8">
          <button className="flex w-full items-center gap-4 rounded-xl px-5 py-3 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="flex w-full items-center gap-4 rounded-xl bg-gradient-to-r from-violet-700 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-900/30">
            <CheckSquare size={20} />
            <span>Todo</span>
          </button>

          <button className="flex w-full items-center gap-4 rounded-xl px-5 py-3 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button className="flex w-full items-center gap-4 rounded-xl px-5 py-3 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white">
            <Info size={20} />
            <span>About</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800 p-5">
        <button
          onClick={onToggleForm}
          style={{
            width: "100%",
            background: "#7c3aed",
            color: "white",
            padding: "16px",
            borderRadius: "16px",
            fontWeight: "700",
          }}
        >
          New Task
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
