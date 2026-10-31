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
            v1.10.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-8">
          <button
            type="button"
            onClick={() => onViewChange && onViewChange("dashboard")}
            className={`flex w-full items-center gap-4 rounded-xl px-5 py-3 transition-all duration-200 ${
              activeView === "dashboard"
                ? "bg-gradient-to-r from-violet-700 to-violet-600 font-semibold text-white shadow-lg shadow-violet-900/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange && onViewChange("todo")}
            className={`flex w-full items-center gap-4 rounded-xl px-5 py-3 transition-all duration-200 ${
              activeView === "todo"
                ? "bg-gradient-to-r from-violet-700 to-violet-600 font-semibold text-white shadow-lg shadow-violet-900/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]`}
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
          <div className="mb-3 flex items-center justify-between px-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Lists
            </p>
            <button
              type="button"
              onClick={() => {
                setIsAddingList((prev) => !prev);
                setErrorMessage("");
              }}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              title="Add new list"
              aria-label="Add new list"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Inline List Creator */}
          {isAddingList && (
            <form onSubmit={handleCreateList} className="mb-3 px-1">
              <div className="flex items-center gap-1.5 rounded-xl border border-violet-500/50 bg-[#1E293B] px-3 py-1.5 shadow-sm">
                <FolderPlus size={15} className="shrink-0 text-violet-400" />
                <input
                  type="text"
                  autoFocus
                  value={newListName}
                  onChange={(e) => {
                    setNewListName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="New list..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="rounded p-1 text-violet-400 transition hover:bg-violet-500/20 hover:text-violet-300"
                  title="Save list"
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListName("");
                    setErrorMessage("");
                  }}
                  className="rounded p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  title="Cancel"
                >
                  <X size={14} />
                </button>
              </div>
              {errorMessage && (
                <p className="mt-1 px-1 text-xs text-red-400">{errorMessage}</p>
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
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-violet-500/10 font-medium text-violet-300"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon size={17} className="shrink-0" />
                    <span className="truncate">{taskList.label}</span>
                  </div>

                  {count > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? "bg-violet-500/20 text-violet-300"
                          : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
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
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-violet-500/10 font-medium text-violet-300"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleListClick(customName)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none"
                  >
                    <Folder size={17} className="shrink-0 text-violet-400" />
                    <span className="truncate">{customName}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {count > 0 && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          isActive
                            ? "bg-violet-500/20 text-violet-300"
                            : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
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
                      className="rounded p-1 text-slate-500 opacity-0 transition hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
                      title={`Delete "${customName}" list`}
                      aria-label={`Delete "${customName}" list`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
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
