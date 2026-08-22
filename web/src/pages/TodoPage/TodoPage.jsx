import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import TodoHeader from "../../components/todo/TodoHeader";
import TodoForm from "../../components/todo/TodoForm";
import TodoList from "../../components/todo/TodoList";

import initialTodos from "../../data/initialTodos";

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    return JSON.parse(savedTodos);
  }

  return initialTodos;
}

function TodoPage() {
  const emptyTodo = {
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "Medium",
    label: "",
  };

  function getResolvedDueDate(dueDate, dueTime) {
    if (dueDate) {
      return dueDate;
    }

    if (!dueTime) {
      return "";
    }

    const now = new Date();
    const [hours, minutes] = dueTime.split(":").map(Number);

    const due = new Date(now);
    due.setHours(hours, minutes, 0, 0);

    // If the entered time has already passed,
    // interpret it as tomorrow.
    if (due <= now) {
      due.setDate(due.getDate() + 1);
    }

    const year = due.getFullYear();
    const month = String(due.getMonth() + 1).padStart(2, "0");
    const day = String(due.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isTaskOverdue(todo) {
    if (todo.completed || !todo.dueDate) {
      return false;
    }

    const [year, month, day] = todo.dueDate.split("-").map(Number);

    const due = new Date(year, month - 1, day);

    if (todo.dueTime) {
      const [hours, minutes] = todo.dueTime.split(":").map(Number);
      due.setHours(hours, minutes, 0, 0);
    } else {
      due.setHours(23, 59, 59, 999);
    }

    return due < new Date();
  }

  function handleTogglePinned(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              pinned: !todo.pinned,
            }
          : todo,
      ),
    );
  }

  const [todos, setTodos] = useState(loadTodos);
  const [newTodo, setNewTodo] = useState(emptyTodo);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewTodo((previousTodo) => ({
      ...previousTodo,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (newTodo.title.trim() === "") {
      return;
    }

    if (editingTodoId !== null) {
      const resolvedDueDate = getResolvedDueDate(
        newTodo.dueDate,
        newTodo.dueTime,
      );

      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === editingTodoId
            ? {
                ...todo,
                ...newTodo,
                dueDate: resolvedDueDate,
              }
            : todo,
        ),
      );

      setEditingTodoId(null);
      setNewTodo(emptyTodo);
      setIsFormVisible(false);
      return;
    }

    const todo = {
      id: Date.now(),
      ...newTodo,
      dueDate: getResolvedDueDate(newTodo.dueDate, newTodo.dueTime),
      completed: false,
      pinned: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((previousTodos) => [...previousTodos, todo]);

    setNewTodo(emptyTodo);
    setIsFormVisible(false);
  }

  function handleDeleteTodo(id) {
    const deletedIndex = todos.findIndex((todo) => todo.id === id);

    if (deletedIndex === -1) {
      return;
    }

    setRecentlyDeleted({
      todo: todos[deletedIndex],
      index: deletedIndex,
    });

    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setNewTodo(emptyTodo);
      setIsFormVisible(false);
    }
  }

  function handleUndoDelete() {
    if (!recentlyDeleted) {
      return;
    }

    setTodos((previousTodos) => {
      const restoredTodos = [...previousTodos];
      const restoreIndex = Math.min(
        recentlyDeleted.index,
        restoredTodos.length,
      );

      restoredTodos.splice(restoreIndex, 0, recentlyDeleted.todo);

      return restoredTodos;
    });

    setRecentlyDeleted(null);
  }

  function handleToggleComplete(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  }

  function handleEditTodo(todo) {
    setEditingTodoId(todo.id);

    setNewTodo({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      dueTime: todo.dueTime || "",
      priority: todo.priority,
      label: todo.label || "",
    });

    setIsFormVisible(true);
  }

  function handleCancelEdit() {
    setEditingTodoId(null);
    setNewTodo(emptyTodo);
    setIsFormVisible(false);
  }

  function handleToggleForm() {
    if (isFormVisible && editingTodoId !== null) {
      handleCancelEdit();
      return;
    }

    setIsFormVisible((previous) => !previous);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (!recentlyDeleted) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setRecentlyDeleted(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [recentlyDeleted]);

  // Completion progress
  const totalTasks = todos.length;

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || todo.priority === priorityFilter;

    if (filter === "Active") {
      return matchesSearch && matchesPriority && !todo.completed;
    }

    if (filter === "Completed") {
      return matchesSearch && matchesPriority && todo.completed;
    }

    return matchesSearch && matchesPriority;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const aPinned = Boolean(a.pinned);
    const bPinned = Boolean(b.pinned);

    if (aPinned !== bPinned) {
      return aPinned ? -1 : 1;
    }

    if (sortBy === "newest") {
      return b.id - a.id;
    }

    if (sortBy === "oldest") {
      return a.id - b.id;
    }

    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  // Split tasks into overdue and regular tasks.
  const overdueTodos = sortedTodos.filter((todo) => isTaskOverdue(todo));

  const regularTodos = sortedTodos.filter((todo) => !isTaskOverdue(todo));

  return (
    <MainLayout onToggleForm={handleToggleForm} isFormVisible={isFormVisible}>
      <TodoHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        completionPercentage={completionPercentage}
      />

      {isFormVisible && (
        <TodoForm
          newTodo={newTodo}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isEditing={editingTodoId !== null}
          onCancel={handleCancelEdit}
        />
      )}

      <TodoList
        todos={regularTodos}
        overdueTodos={overdueTodos}
        totalTaskCount={todos.length}
        searchTerm={searchTerm}
        filter={filter}
        priorityFilter={priorityFilter}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleComplete}
        onEdit={handleEditTodo}
        onTogglePinned={handleTogglePinned}
      />

      {recentlyDeleted && (
        <div
          role="status"
          aria-live="polite"
          className="
            fixed bottom-5 left-4 right-4 z-50
            flex items-center justify-between gap-4
            rounded-xl border border-slate-700
            bg-[#111827] px-4 py-3
            shadow-2xl shadow-black/30
            sm:left-auto sm:right-6 sm:w-[360px]
          "
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Task deleted</p>

            <p className="mt-0.5 truncate text-xs text-slate-400">
              {recentlyDeleted.todo.title}
            </p>
          </div>

          <button
            type="button"
            onClick={handleUndoDelete}
            className="
              shrink-0 rounded-lg px-3 py-2
              text-sm font-semibold text-violet-400
              transition
              hover:bg-violet-500/10 hover:text-violet-300
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#111827]
            "
          >
            Undo
          </button>
        </div>
      )}
    </MainLayout>
  );
}

export default TodoPage;
