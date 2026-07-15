import TodoCard from "../TodoCard";

function TodoList({ todos }) {
  return (
    <section className="space-y-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
