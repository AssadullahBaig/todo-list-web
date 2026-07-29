import TodoCard from "../TodoCard";

function TodoList({ todos, onDelete, onToggle }) {
  const todoCards = todos.map((todo) => (
    <TodoCard
      key={todo.id}
      todo={todo}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  ));

  return <section className="space-y-4">{todoCards}</section>;
}

export default TodoList;
