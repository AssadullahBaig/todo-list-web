import TodoCard from "../TodoCard";

function TodoList({ todos, onDelete }) {
  const todoCards = todos.map((todo) => (
    <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
  ));

  return <section className="space-y-4">{todoCards}</section>;
}

export default TodoList;
