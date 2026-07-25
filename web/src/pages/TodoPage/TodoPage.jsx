import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/todo/PageHeader";
import TodoList from "../../components/todo/TodoList";

import initialTodos from "../../data/initialTodos";

function TodoPage() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <MainLayout>
      <PageHeader />
      <TodoList todos={todos} />
    </MainLayout>
  );
}

export default TodoPage;
