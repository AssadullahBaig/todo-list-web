import { useState } from "react";
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
  Folder,
  FolderPlus,
  Check,
  X,
  Trash2,
} from "lucide-react";

const taskLists = [
  { name: "All", label: "All Tasks", icon: List },
  { name: "Inbox", label: "Inbox", icon: Inbox },
  { name: "Work", label: "Work", icon: Briefcase },
  { name: "Study", label: "Study", icon: BookOpen },
  { name: "Personal", label: "Personal", icon: User },
];

function Sidebar({
  onToggleForm,
  listFilter,
  onListFilterChange,
  customLists = [],
  onAddCustomList,
  onDeleteCustomList,
  taskCountsByList = {},
  totalTasks = 0,
  activeView = "todo",
  onViewChange,
}) {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleCreateList(e) {
    e.preventDefault();
    const trimmed = newListName.trim();
    if (!trimmed) {
      setErrorMessage("List name cannot be empty");
      return;
    }

    if (onAddCustomList) {
      const result = onAddCustomList(trimmed);
      if (result && !result.success) {
        setErrorMessage(result.error || "Cannot add list");
        return;
      }
    }

    setNewListName("");
    setErrorMessage("");
    setIsAddingList(false);
  }

  function handleListClick(listName) {
    onListFilterChange(listName);
    if (onViewChange && activeView !== "todo") {
      onViewChange("todo");
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col justify-between border-r border-[#27272a] bg-[#0e0e11] p-4 font-sans">
      {/* Top Section */}
      <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
        {/* Brand / Subtitle Header */}
        <div className="mb-6 px-3">
          <h2 className="text-lg font-bold tracking-tight text-white">
            TaskFlow
          </h2>
          <p className="text-xs text-zinc-400">Premium Productivity</p>
          <span className="mt-3 inline-block rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-500">
            v1.10.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          <button
            type="button"
            onClick={() => onViewChange && onViewChange("dashboard")}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${activeView === "dashboard"
              ? "bg-white text-zinc-950 shadow-sm"
              : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
              }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange && onViewChange("todo")}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${activeView === "todo"
              ? "bg-white text-zinc-950 shadow-sm"
              : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
              }`}
          >
            <CheckSquare size={18} />
            <span>Todo</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800/60 hover:text-white"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800/60 hover:text-white"
          >
            <Info size={18} />
            <span>About</span>
          </button>
        </nav>

        {/* Task Lists Section */}
        <div className="mt-8 border-t border-[#27272a] pt-5">
          <div className="mb-3 flex items-center justify-between px-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Lists
            </p>
            <button
              type="button"
              onClick={() => {
                setIsAddingList((prev) => !prev);
                setErrorMessage("");
              }}
              className="rounded p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              title="Add new list"
              aria-label="Add new list"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Inline List Creator */}
          {isAddingList && (
            <form onSubmit={handleCreateList} className="mb-3 px-1">
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-[#18181b] px-3 py-1.5 shadow-sm">
                <FolderPlus size={15} className="shrink-0 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  value={newListName}
                  onChange={(e) => {
                    setNewListName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="New list..."
                  className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  className="rounded p-1 text-emerald-400 hover:text-emerald-300"
                  title="Save list"
                >
                  <Check size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListName("");
                    setErrorMessage("");
                  }}
                  className="rounded p-1 text-zinc-400 hover:text-white"
                  title="Cancel"
                >
                  <X size={13} />
                </button>
              </div>
              {errorMessage && (
                <p className="mt-1 px-1 text-[11px] text-rose-400">{errorMessage}</p>
              )}
            </form>
          )}

          <div className="space-y-1">
            {/* Standard Lists */}
            {taskLists.map((taskList) => {
              const Icon = taskList.icon;
              const isActive = listFilter === taskList.name;
              const count =
                taskList.name === "All"
                  ? totalTasks
                  : taskCountsByList[taskList.name] || 0;

              return (
                <button
                  key={taskList.name}
                  type="button"
                  onClick={() => handleListClick(taskList.name)}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${isActive
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={15} className="shrink-0 text-zinc-400" />
                    <span className="truncate">{taskList.label}</span>
                  </div>

                  {count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-medium ${isActive
                        ? "bg-zinc-700 text-white"
                        : "bg-[#18181b] text-zinc-400 group-hover:text-zinc-300"
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Custom Lists */}
            {customLists.map((customName) => {
              const isActive = listFilter === customName;
              const count = taskCountsByList[customName] || 0;

              return (
                <div
                  key={customName}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${isActive
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => handleListClick(customName)}
                    className="flex min-w-0 flex-1 items-center gap-2.5 text-left outline-none"
                  >
                    <Folder size={15} className="shrink-0 text-zinc-400" />
                    <span className="truncate">{customName}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {count > 0 && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-medium ${isActive
                          ? "bg-zinc-700 text-white"
                          : "bg-[#18181b] text-zinc-400 group-hover:text-zinc-300"
                          }`}
                      >
                        {count}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `Delete list "${customName}"? Any tasks inside will be moved to Inbox.`
                          )
                        ) {
                          onDeleteCustomList(customName);
                        }
                      }}
                      className="rounded p-1 text-zinc-500 opacity-0 transition hover:text-rose-400 group-hover:opacity-100"
                      title={`Delete "${customName}" list`}
                      aria-label={`Delete "${customName}" list`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: New Task Button matching Stitch */}
      <div className="border-t border-[#27272a] pt-4">
        <button
          onClick={onToggleForm}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700/60 bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow transition-all hover:bg-zinc-200 active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New Task</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
