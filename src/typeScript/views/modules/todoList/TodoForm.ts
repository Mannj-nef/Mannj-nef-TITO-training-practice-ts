function TodoForm() {
  return `
    <form class="main-form" autocomplete="off">
        <input
            class="main-input"
            name="input-todo"
            type="text"
            placeholder="Add your new todo..."
        />
       <div class="main-action">
          <button type="button" class="btn-remove-form">
            <i class="ti-close"></i>
          </button>
          <button type="submit" class="main-btn">
            <div class="loading d-none"></div>
            <span class="action-todo">ADD</span>
          </button>
       </div >
    </form>
  `;
}

export default TodoForm;
