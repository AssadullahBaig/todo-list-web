import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import TodoHeader from "../../components/todo/TodoHeader";
import TodoForm from "../../components/todo/TodoForm";
import TodoList from "../../components/todo/TodoList";

import initialTodos from "../../data/initialTodos";

function TodoPage() {
  const emptyTodo = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  };

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState(emptyTodo);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

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
      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === editingTodoId
            ? {
                ...todo,
                ...newTodo,
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
      completed: false,
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
      priority: todo.priority,
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

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === "Active") {
      return matchesSearch && !todo.completed;
    }

    if (filter === "Completed") {
      return matchesSearch && todo.completed;
    }

    return matchesSearch;
  });

  return (
    <MainLayout onToggleForm={handleToggleForm} isFormVisible={isFormVisible}>
      <TodoHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
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
        todos={filteredTodos}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleComplete}
        onEdit={handleEditTodo}
      />
    </MainLayout>
  );
}

export default TodoPage;
