function TodoConfirmDelete() {
  return `
    <div class="todo-confirm-delete">
        <p>Confirm remove</p>
        <div class="btn-confirm-remove-wrapp">
            <button class="btn btn-confirm-remove">
                remove
            </button>
            <button class="btn btn-confirm-remove-cancel">
                cancel
            </button>
        </div class="btn-confirm-remove-wrapp">
    </div>
    `;
}

export default TodoConfirmDelete;
