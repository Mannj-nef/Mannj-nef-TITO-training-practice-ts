import Header from "../components/Header";
import TodoList from "../modules/todoList/TodoList";

function TodoPage() {
  return `
    <div class="todo-page">
      <div class="todo-content container">
        ${Header()}
        ${TodoList()}
      </div>
    </div>
    `;
}

export default TodoPage;
