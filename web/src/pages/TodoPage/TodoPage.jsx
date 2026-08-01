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

    setTodos((previousTodos) => [
      ...previousTodos,
      {
        id: Date.now(),
        ...newTodo,
        completed: false,
      },
    ]);

    setNewTodo(emptyTodo);
    setIsFormVisible(false);
  }
  function handleToggleForm() {
    if (isFormVisible && editingTodoId !== null) {
      handleCancelEdit();
      return;
    }
    setIsFormVisible(!isFormVisible);
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
  setIsFormVisible(true);

  setNewTodo({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    priority: todo.priority,
  });
}

function handleCancelEdit() {
  setEditingTodoId(null);
  setIsFormVisible(false);

  setNewTodo({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
}

function handleToggleForm() {
  setIsFormVisible((previous) => !previous);
}

return (
  <MainLayout onToggleForm={handleToggleForm} isFormVisible={isFormVisible}>
    <TodoHeader />

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
      todos={todos}
      onDelete={handleDeleteTodo}
      onToggle={handleToggleComplete}
      onEdit={handleEditTodo}
    />
  </MainLayout>
);

export default TodoPage;
