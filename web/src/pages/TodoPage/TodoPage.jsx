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

      return;
    }

    const todo = {
      id: Date.now(),
      ...newTodo,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, todo]);
    setNewTodo(emptyTodo);
  }

  function handleDeleteTodo(id) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setNewTodo(emptyTodo);
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
  }

  return (
    <MainLayout>
      <TodoHeader />

      <TodoForm
        newTodo={newTodo}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={editingTodoId !== null}
      />

      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleComplete}
        onEdit={handleEditTodo}
      />
    </MainLayout>
  );
}

export default TodoPage;
