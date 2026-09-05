import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import TodoHeader from "../../components/todo/TodoHeader";
import TodoForm from "../../components/todo/TodoForm";
import TodoList from "../../components/todo/TodoList";

import initialTodos from "../../data/initialTodos";

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);

    return parsedTodos.map((todo) => ({
      ...todo,
      notes: todo.notes || "",
      subtasks: todo.subtasks || [],
    }));
  }

  return initialTodos;
}

function TodoPage() {
  const emptyTodo = {
    title: "",
    description: "",
    notes: "",
    dueDate: "",
    dueTime: "",
    priority: "Medium",
    label: "",
    recurrence: "none",
    subtasks: [],
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

  function getNextRecurringDueDate(todo) {
    const recurrence = (todo.recurrence || "none").toLowerCase();

    if (!["daily", "weekly", "monthly"].includes(recurrence)) {
      return todo.dueDate || "";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextDate;

    if (todo.dueDate) {
      const [year, month, day] = todo.dueDate.split("-").map(Number);
      nextDate = new Date(year, month - 1, day);
    } else {
      nextDate = new Date(today);
    }

    const monthlyAnchorDay = nextDate.getDate();

    if (recurrence === "daily") {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    if (recurrence === "weekly") {
      nextDate.setDate(nextDate.getDate() + 7);
    }

    if (recurrence === "monthly") {
      const targetMonth = nextDate.getMonth() + 1;
      const targetYear = nextDate.getFullYear() + Math.floor(targetMonth / 12);

      const normalizedMonth = targetMonth % 12;

      const lastDayOfTargetMonth = new Date(
        targetYear,
        normalizedMonth + 1,
        0,
      ).getDate();

      nextDate = new Date(
        targetYear,
        normalizedMonth,
        Math.min(monthlyAnchorDay, lastDayOfTargetMonth),
      );
    }

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const day = String(nextDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function resetSubtasks(subtasks = []) {
    return subtasks.map((subtask) => ({
      ...subtask,
      completed: false,
    }));
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
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTodoIds, setSelectedTodoIds] = useState([]);

  function handleToggleSelectionMode() {
    if (isSelectionMode) {
      setSelectedTodoIds([]);
    }

    setIsSelectionMode((previous) => !previous);
  }

  function handleToggleTodoSelection(id) {
    setSelectedTodoIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((todoId) => todoId !== id)
        : [...previousIds, id],
    );
  }

  function handleCompleteSelectedTodos() {
    setTodos((previousTodos) =>
      previousTodos.map((todo) => {
        if (!selectedTodoIds.includes(todo.id) || todo.completed) {
          return todo;
        }

        const recurrence = (todo.recurrence || "none").toLowerCase();

        const isRecurring = ["daily", "weekly", "monthly"].includes(recurrence);

        if (isRecurring) {
          return {
            ...todo,
            dueDate: getNextRecurringDueDate(todo),
            completed: false,
            subtasks: resetSubtasks(todo.subtasks),
          };
        }

        return {
          ...todo,
          completed: true,
        };
      }),
    );

    setSelectedTodoIds([]);
  }
  function handleEditSelectedTodo() {
    if (selectedTodoIds.length !== 1) {
      return;
    }

    const selectedTodo = todos.find((todo) => todo.id === selectedTodoIds[0]);

    if (!selectedTodo) {
      return;
    }

    setSelectedTodoIds([]);
    setIsSelectionMode(false);

    handleEditTodo(selectedTodo);
  }

  function handlePinSelectedTodos() {
    if (selectedTodoIds.length === 0) {
      return;
    }

    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        selectedTodoIds.includes(todo.id)
          ? {
              ...todo,
              pinned: true,
            }
          : todo,
      ),
    );

    setSelectedTodoIds([]);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewTodo((previousTodo) => ({
      ...previousTodo,
      [name]: value,
    }));
  }

  function handleAddSubtask() {
    setNewTodo((previousTodo) => ({
      ...previousTodo,
      subtasks: [
        ...previousTodo.subtasks,
        {
          id: Date.now(),
          title: "",
          completed: false,
        },
      ],
    }));
  }

  function handleSubtaskChange(id, value) {
    setNewTodo((previousTodo) => ({
      ...previousTodo,
      subtasks: previousTodo.subtasks.map((subtask) =>
        subtask.id === id
          ? {
              ...subtask,
              title: value,
            }
          : subtask,
      ),
    }));
  }

  function handleRemoveSubtask(id) {
    setNewTodo((previousTodo) => ({
      ...previousTodo,
      subtasks: previousTodo.subtasks.filter((subtask) => subtask.id !== id),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (newTodo.title.trim() === "") {
      return;
    }

    const cleanSubtasks = newTodo.subtasks
      .filter((subtask) => subtask.title.trim() !== "")
      .map((subtask) => ({
        ...subtask,
        title: subtask.title.trim(),
      }));

    const cleanNotes = newTodo.notes.trim();

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
                notes: cleanNotes,
                subtasks: cleanSubtasks,
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
      notes: cleanNotes,
      subtasks: cleanSubtasks,
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
      items: [
        {
          todo: todos[deletedIndex],
          index: deletedIndex,
        },
      ],
    });

    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setNewTodo(emptyTodo);
      setIsFormVisible(false);
    }
  }

  function handleDeleteSelectedTodos() {
    if (selectedTodoIds.length === 0) {
      return;
    }

    const deletedItems = todos
      .map((todo, index) => ({
        todo,
        index,
      }))
      .filter(({ todo }) => selectedTodoIds.includes(todo.id));

    if (deletedItems.length === 0) {
      return;
    }

    setRecentlyDeleted({
      items: deletedItems,
    });

    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !selectedTodoIds.includes(todo.id)),
    );

    if (editingTodoId !== null && selectedTodoIds.includes(editingTodoId)) {
      setEditingTodoId(null);
      setNewTodo(emptyTodo);
      setIsFormVisible(false);
    }

    setSelectedTodoIds([]);
  }

  function handleUndoDelete() {
    if (!recentlyDeleted || recentlyDeleted.items.length === 0) {
      return;
    }

    setTodos((previousTodos) => {
      const restoredTodos = [...previousTodos];

      const deletedItems = [...recentlyDeleted.items].sort(
        (a, b) => a.index - b.index,
      );

      deletedItems.forEach(({ todo, index }) => {
        const restoreIndex = Math.min(index, restoredTodos.length);

        restoredTodos.splice(restoreIndex, 0, todo);
      });

      return restoredTodos;
    });

    setRecentlyDeleted(null);
  }

  function handleToggleComplete(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        const recurrence = (todo.recurrence || "none").toLowerCase();

        const isRecurring = ["daily", "weekly", "monthly"].includes(recurrence);

        if (!todo.completed && isRecurring) {
          return {
            ...todo,
            dueDate: getNextRecurringDueDate(todo),
            completed: false,
            subtasks: resetSubtasks(todo.subtasks),
          };
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    );
  }

  function handleToggleSubtask(todoId, subtaskId) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: (todo.subtasks || []).map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      completed: !subtask.completed,
                    }
                  : subtask,
              ),
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
      notes: todo.notes || "",
      dueDate: todo.dueDate,
      dueTime: todo.dueTime || "",
      priority: todo.priority,
      label: todo.label || "",
      recurrence: todo.recurrence || "none",
      subtasks: todo.subtasks || [],
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

  function handleClearFilters() {
    setSearchTerm("");
    setFilter("All");
    setPriorityFilter("All");
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

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredTodos = todos.filter((todo) => {
    const searchableText = [
      todo.title,
      todo.description || "",
      todo.notes || "",
      todo.label || "",
      ...(todo.subtasks || []).map((subtask) => subtask.title),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearchTerm);

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
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
        selectedCount={selectedTodoIds.length}
        onCompleteSelected={handleCompleteSelectedTodos}
        onEditSelected={handleEditSelectedTodo}
        onPinSelected={handlePinSelectedTodos}
        onDeleteSelected={handleDeleteSelectedTodos}
      />

      {isFormVisible && (
        <TodoForm
          newTodo={newTodo}
          onInputChange={handleInputChange}
          onAddSubtask={handleAddSubtask}
          onSubtaskChange={handleSubtaskChange}
          onRemoveSubtask={handleRemoveSubtask}
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
        onClearFilters={handleClearFilters}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleComplete}
        onEdit={handleEditTodo}
        onTogglePinned={handleTogglePinned}
        isSelectionMode={isSelectionMode}
        selectedTodoIds={selectedTodoIds}
        onToggleSelection={handleToggleTodoSelection}
        onToggleSubtask={handleToggleSubtask}
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
            <p className="text-sm font-semibold text-white">
              {recentlyDeleted.items.length === 1
                ? "Task deleted"
                : `${recentlyDeleted.items.length} tasks deleted`}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-400">
              {recentlyDeleted.items.length === 1
                ? recentlyDeleted.items[0].todo.title
                : "Selected tasks were removed"}
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
