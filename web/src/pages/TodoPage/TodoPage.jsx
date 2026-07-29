import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import TodoHeader from "../../components/todo/TodoHeader";
import TodoForm from "../../components/todo/TodoForm";
import TodoList from "../../components/todo/TodoList";

import initialTodos from "../../data/initialTodos";

function TodoPage() {
  const [todos, setTodos] = useState(initialTodos);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewTodo((previousTodo) => ({
      ...previousTodo,
      [name]: value,
    }));
  }

  function handleAddTodo(event) {
    event.preventDefault();

    if (newTodo.title.trim() === "") {
      return;
    }

    const todo = {
      id: Date.now(),
      title: newTodo.title,
      description: newTodo.description,
      dueDate: newTodo.dueDate,
      priority: newTodo.priority,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, todo]);

    setNewTodo({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    });
  }

  return (
    <MainLayout>
      <TodoHeader />

      <TodoForm
        newTodo={newTodo}
        onInputChange={handleInputChange}
        onSubmit={handleAddTodo}
      />

      <TodoList todos={todos} />
    </MainLayout>
  );
}

export default TodoPage;
