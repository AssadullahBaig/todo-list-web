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
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setNewTodo(emptyTodo);
      setIsFormVisible(false);
    }
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
        todos={sortedTodos}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleComplete}
        onEdit={handleEditTodo}
        onTogglePinned={handleTogglePinned}
      />
    </MainLayout>
  );
}

export default TodoPage;
