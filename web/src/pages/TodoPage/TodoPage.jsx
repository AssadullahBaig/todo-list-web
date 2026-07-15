import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/todo/TodoHeader";
import TodoInput from "../../components/todo/TodoInput";
import TodoFilters from "../../components/todo/TodoFilters";
import TodoList from "../../components/todo/TodoList";

import todos from "../../data/todos";

function TodoPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl p-8">
        <PageHeader />

        <TodoInput />

        <TodoFilters />

        <TodoList todos={todos} />
      </div>
    </MainLayout>
  );
}

export default TodoPage;
