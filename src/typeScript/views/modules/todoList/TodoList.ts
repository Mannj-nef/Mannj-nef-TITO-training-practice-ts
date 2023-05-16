import TodoForm from "./TodoForm";

const TodoList = (): string => {
  return `
    <div class="todo-main">
        <h2 class="main-title">Todo App</h2>
            ${TodoForm()}
        <div class="todo-list">
        </div>
    </div>

  `;
};

export default TodoList;
