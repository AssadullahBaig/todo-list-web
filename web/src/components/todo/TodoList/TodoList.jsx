import TodoCard from "../TodoCard";

function TodoList({ todos }) {
  const todoCards = todos.map((todo) => <TodoCard key={todo.id} todo={todo} />);

  return <section className="space-y-4">{todoCards}</section>;
}

export default TodoList;
