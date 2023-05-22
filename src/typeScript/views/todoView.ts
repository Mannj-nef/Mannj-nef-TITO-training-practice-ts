import { ACTION_FORM, KEY } from "../enums";
import { ITodo } from "../interfaces";
import debounce from "../helpers/debounce";
import { handleFormTodo } from "../helpers/form";
import { clearLocalStorage, setLocalStorage } from "../helpers/localStorage";
import TodoConfirmDelete from "./modules/todoList/TodoConfirmDelete";
import TodoItem from "./modules/todoList/TodoItem";
import handleGetElm from "../helpers/handleGetElm";

const disableClassname = "disable";

class TodoView {
  private form: HTMLFormElement;
  private todoListElm: HTMLDivElement;
  private todoConfirmCurrent: HTMLDivElement;
  private btnLogout: HTMLButtonElement;
  private inputMain: HTMLInputElement;

  constructor() {
    this.form = handleGetElm<HTMLFormElement>(".main-form");
    this.todoListElm = handleGetElm<HTMLDivElement>(".todo-list");
    this.todoConfirmCurrent = handleGetElm<HTMLDivElement>(
      ".todo-confirm-delete"
    );
    this.btnLogout = handleGetElm<HTMLButtonElement>(".header-logout");
    this.inputMain = handleGetElm<HTMLInputElement>(".main-input");
  }

  getValueInput(handle: (inputValue: string, action: ACTION_FORM) => void) {
    const form = this.form;

    if (!form) return;
    handleFormTodo(form, this.disableTodoView, handle);
  }

  displayTodos = (todos: ITodo[]): void => {
    const todoListElm = this.todoListElm;
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
    const RemoveConfirm = (): void => {
      const confirmParent = todoConfirm.parentNode as HTMLDivElement;
      confirmParent.removeChild(todoConfirm);
    };

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
  }

  getIdDeleteTodo(handle: (id: string) => Promise<void>) {
    const todoList = this.todoListElm;
    if (!todoList) return;

    const todoItemsBtnRemove = todoList.querySelectorAll(
      ".btn-remove"
    ) as NodeListOf<HTMLButtonElement>;

    [...todoItemsBtnRemove].forEach((btnItem: HTMLButtonElement): void => {
      btnItem.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();

        const target = e.target as HTMLButtonElement;
        const { id } = target.dataset;

        const todoConfirmCurrent = this.todoConfirmCurrent;

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

        if (!!checkBoxElm) {
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
    const todoList = this.todoListElm;

    if (!todoList) return;
    const todoItemBtnUpdate = todoList.querySelectorAll(
      ".btn-update"
    ) as NodeListOf<HTMLButtonElement>;

    const handleForm = (todoValue: string): void => {
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
    };

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
  };

  resetFormTodoView = (): void => {
    const form = this.form;
    if (!form) return;
    const btnRemoveValue = form.querySelector(
      ".btn-remove-form"
    ) as HTMLButtonElement;
    const actionTodo = form.querySelector(".action-todo") as HTMLSpanElement;

    btnRemoveValue.classList.remove("main-update");
    actionTodo.textContent = ACTION_FORM.ADD;
  };

  logOutView = (handle: () => void): void => {
    const btnLogout = this.btnLogout;

    btnLogout.addEventListener("click", () => {
      clearLocalStorage(KEY.LOCALSTORAGE_USER);

      if (typeof handle === "function") {
        handle();
      }
    });
  };

  disableTodoView = (clearDisable: boolean = false): void => {
    const todoElm = document.querySelectorAll(
      ".todo-item"
    ) as NodeListOf<HTMLDivElement>;

    const inputMain = this.inputMain;

    [...todoElm].forEach((todo) => {
      if (!clearDisable) {
        todo.classList.add(disableClassname);
        inputMain.classList.add(disableClassname);
        todo.style.pointerEvents = "none";
        inputMain.style.pointerEvents = "none";
      } else {
        todo.classList.remove(disableClassname);
        inputMain.classList.remove(disableClassname);
        todo.style.pointerEvents = "";
        inputMain.style.pointerEvents = "";
      }
    });
  };
}

export default TodoView;
