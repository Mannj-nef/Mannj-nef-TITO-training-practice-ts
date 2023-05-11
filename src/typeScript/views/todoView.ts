import { ACTION_FORM, KEY } from "../constants/enum";
import { ITodo } from "../constants/interface";
import debounce from "../helper/debounce";
import { handleFormTodo } from "../helper/form";
import { clearLocalStorage, setLocalStorage } from "../helper/localStorage";
import TodoConfirmDelete from "./modules/todoList/TodoConfirmDelete";
import TodoItem from "./modules/todoList/TodoItem";

class TodoView {
  getValueInput(handle: any) {
    const form = document.querySelector(".main-form") as any;
    if (form) {
      handleFormTodo(form, this.disableTodoView, handle);
    }
  }

  displayTodos = (todos: ITodo[]): void => {
    const todoListElm = document.querySelector(".todo-list") as HTMLDivElement;
    if (todos.length > 0) {
      const todoList = todos.map((todoItem: ITodo) => TodoItem(todoItem));
      todoListElm.innerHTML = todoList.reverse().join("");
    }
  };

  confirmDelete(
    id: string,
    todoConfirm: HTMLDivElement,
    handle: (id: string) => void
  ): void {
    const btnRemove = document.querySelector(
      ".btn-confirm-remove"
    ) as HTMLButtonElement;
    const btnCancel = document.querySelector(
      ".btn-confirm-remove-cancel"
    ) as HTMLButtonElement;

    btnRemove.addEventListener("click", (e: MouseEvent): void => {
      e.stopPropagation();
      if (typeof handle === "function") {
        debounce(() => {
          this.disableTodoView();
          handle(id);
        }, 500);
        RemoveConfirm();
      }
    });

    btnCancel.addEventListener("click", (e: MouseEvent): void => {
      e.stopPropagation();
      RemoveConfirm();
    });

    function RemoveConfirm(): void {
      const confirmParent = todoConfirm.parentNode as HTMLDivElement;
      confirmParent.removeChild(todoConfirm);
    }
  }

  getIdDeleteTodo(handle: (id: string) => Promise<void>) {
    const todoList = document.querySelector(".todo-list") as HTMLDivElement;
    if (!todoList) return;

    const todoItemsBtnRemove = todoList.querySelectorAll(
      ".btn-remove"
    ) as NodeListOf<HTMLButtonElement>;

    [...todoItemsBtnRemove].forEach((btnItem: HTMLButtonElement): void => {
      btnItem.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();

        const target = e.target as HTMLButtonElement;
        const { id } = target.dataset;

        const todoConfirmCurrent = document.querySelector(
          ".todo-confirm-delete"
        ) as HTMLDivElement;

        if (todoConfirmCurrent) {
          const confirmParrent =
            todoConfirmCurrent.parentNode as HTMLDivElement;
          confirmParrent.removeChild(todoConfirmCurrent);
        }

        //  create todoConfirm
        const TodoConfirm = TodoConfirmDelete();
        btnItem.insertAdjacentHTML("afterend", TodoConfirm);
        const todoConfirm = document.querySelector(
          ".todo-confirm-delete"
        ) as HTMLDivElement;

        if (!id) return;
        this.confirmDelete(id, todoConfirm, handle);
      });
    });
  }

  activeTodoWhenDone(handle: (id: string, status: boolean) => void): void {
    const todos = document.querySelectorAll(
      ".todo-item"
    ) as NodeListOf<HTMLDivElement>;
    [...todos].forEach((todo) => {
      todo.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();

        const target = e.target as HTMLDivElement;
        const id = target.dataset.id_todo as string;
        const classChecked = "checkbox-input-checked";

        const checkBoxElm = target.querySelector(
          ".checkbox-input"
        ) as HTMLInputElement;

        if (checkBoxElm) {
          this.disableTodoView();

          debounce(() => {
            if (typeof handle === "function") {
              checkBoxElm.classList.toggle(classChecked);
              const status = checkBoxElm.classList.contains(classChecked);

              handle(id, status);
            }
          }, 500);
        }
      });
    });
  }

  getValueUpdateTodoView = (): void => {
    const todoList = document.querySelector(".todo-list") as HTMLDivElement;

    if (!todoList) return;
    const todoItemBtnUpdate = todoList.querySelectorAll(
      ".btn-update"
    ) as NodeListOf<HTMLButtonElement>;
    [...todoItemBtnUpdate].forEach((btnUpdate) => {
      btnUpdate.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.target as HTMLButtonElement;
        const { id } = target.dataset;
        const todoItem = target.parentNode?.parentNode as HTMLDivElement;

        if (!todoItem.classList.contains("todo-item")) return;

        const todoLable = todoItem.querySelector(
          ".checkbox-label"
        ) as HTMLLabelElement;
        const todoValue = todoLable.textContent;

        id && setLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE, id);

        todoValue && handleForm(todoValue);
      });
    });

    function handleForm(todoValue: string): void {
      const form = document.querySelector(".main-form") as HTMLFormElement;

      if (!form) return;
      const inputTodo = form.querySelector(".main-input") as HTMLInputElement;

      inputTodo.focus();
      inputTodo.value = todoValue.trim();

      const btnRemoveValue = form.querySelector(
        ".btn-remove-form"
      ) as HTMLButtonElement;
      btnRemoveValue.classList.add("main-update");

      const actionTodo = form.querySelector(".action-todo") as HTMLSpanElement;
      actionTodo.textContent = ACTION_FORM.UPDATE;

      btnRemoveValue.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        inputTodo.value = "";
        actionTodo.textContent = ACTION_FORM.ADD;
        btnRemoveValue.classList.remove("main-update");
      });
    }
  };

  resetFormTodoView = (): void => {
    const form = document.querySelector(".main-form") as HTMLFormElement;
    if (!form) return;
    const btnRemoveValue = form.querySelector(
      ".btn-remove-form"
    ) as HTMLButtonElement;
    const actionTodo = form.querySelector(".action-todo") as HTMLSpanElement;

    btnRemoveValue.classList.remove("main-update");
    actionTodo.textContent = ACTION_FORM.ADD;
  };

  logOutView = (handle: () => void): void => {
    const btnLogout = document.querySelector(
      ".header-logout"
    ) as HTMLButtonElement;

    btnLogout.addEventListener("click", () => {
      clearLocalStorage(KEY.LOCALSTORAGE_UESR);

      if (typeof handle === "function") {
        handle();
      }
    });
  };

  disableTodoView = (clearDisable: boolean = false): void => {
    const todoElm = document.querySelectorAll(
      ".todo-item"
    ) as NodeListOf<HTMLDivElement>;
    const inputMain = document.querySelector(".main-input") as HTMLInputElement;

    [...todoElm].forEach((todo) => {
      if (!clearDisable) {
        todo.classList.add("disable");
        inputMain.classList.add("disable");
        todo.style.pointerEvents = "none";
        inputMain.style.pointerEvents = "none";
      } else {
        todo.classList.remove("disable");
        inputMain.classList.remove("disable");
        todo.style.pointerEvents = "";
        inputMain.style.pointerEvents = "";
      }
    });
  };
}

export default TodoView;
