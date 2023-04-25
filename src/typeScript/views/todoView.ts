import { ACTION_FORM, KEY } from "../constants/type";
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

  displayTodos = (todos: any) => {
    const todoListElm = document.querySelector(".todo-list") as any;
    if (todos.length > 0) {
      const todoList = todos.map((todoItem: any) => TodoItem(todoItem));
      todoListElm.innerHTML = todoList.reverse().join("");
    }
  };

  confirmDelete(id: any, btnTodoConfirm: any, handle: any) {
    const btnRemove = document.querySelector(".btn-confirm-remove") as any;
    const btnCancel = document.querySelector(
      ".btn-confirm-remove-cancel"
    ) as any;

    btnRemove.addEventListener("click", (e: any) => {
      e.stopPropagation();
      if (typeof handle === "function") {
        debounce(() => {
          this.disableTodoView();
          handle(id);
        }, 500);
        RemoveConfirm();
      }
    });

    btnCancel.addEventListener("click", (e: any) => {
      e.stopPropagation();
      RemoveConfirm();
    });

    function RemoveConfirm() {
      const confirmParent = btnTodoConfirm.parentNode as any;
      confirmParent.removeChild(btnTodoConfirm);
    }
  }

  getIdDeleteTodo(handle: any) {
    const todoList = document.querySelector(".todo-list") as any;
    if (!todoList) return;

    const todoItemsBtnRemove = todoList.querySelectorAll(
      ".btn-remove"
    ) as NodeListOf<any>;

    [...todoItemsBtnRemove].forEach((btnItem: any) => {
      btnItem.addEventListener("click", (e: any) => {
        e.stopPropagation();

        const { target } = e;
        const { id } = target.dataset;

        const todoConfirmCurrent = document.querySelector(
          ".todo-confirm-delete"
        );

        if (todoConfirmCurrent) {
          const confirmParrent = todoConfirmCurrent.parentNode as any;
          confirmParrent.removeChild(todoConfirmCurrent);
        }

        //  create todoConfirm
        const TodoConfirm = TodoConfirmDelete();
        btnItem.insertAdjacentHTML("afterend", TodoConfirm);
        const todoConfirm = document.querySelector(
          ".todo-confirm-delete"
        ) as any;

        if (!id) return;
        this.confirmDelete(id, todoConfirm, handle);
      });
    });
  }

  activeTodoWhenDone(handle: any) {
    const todos = document.querySelectorAll(
      ".todo-item"
    ) as NodeListOf<HTMLDivElement>;
    [...todos].forEach((todo) => {
      todo.addEventListener("click", (e: any) => {
        e.stopPropagation();

        const { target } = e;
        const id = target.dataset.id_todo;
        const classChecked = "checkbox-input-checked";

        const checkBoxElm = target.querySelector(".checkbox-input") as any;

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

  getValueUpdateTodoView = () => {
    const todoList = document.querySelector(".todo-list") as any;

    if (!todoList) return;
    const todoItemBtnUpdate = todoList.querySelectorAll(
      ".btn-update"
    ) as NodeListOf<any>;
    [...todoItemBtnUpdate].forEach((btnUpdate) => {
      btnUpdate.addEventListener("click", (e: any) => {
        e.stopPropagation();
        const { target } = e;
        const { id } = target.dataset;
        const todoItem = target.parentNode.parentNode;

        if (!todoItem.classList.contains("todo-item")) return;

        const todoLable = todoItem.querySelector(".checkbox-label") as any;
        const todoValue = todoLable.textContent;

        setLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE, id);

        handleForm(todoValue);
      });
    });

    function handleForm(todoValue: any) {
      const form = document.querySelector(".main-form") as any;

      if (!form) return;
      const inputTodo = form.querySelector(".main-input") as any;

      inputTodo.focus();
      inputTodo.value = todoValue.trim();

      const btnRemoveValue = form.querySelector(".btn-remove-form") as any;
      btnRemoveValue.classList.add("main-update");

      const actionTodo = form.querySelector(".action-todo") as any;
      actionTodo.textContent = ACTION_FORM.UPDATE;

      btnRemoveValue.addEventListener("click", (e: any) => {
        e.stopPropagation();
        inputTodo.value = "";
        actionTodo.textContent = ACTION_FORM.ADD;
        btnRemoveValue.classList.remove("main-update");
      });
    }
  };

  resetFormTodoView = () => {
    const form = document.querySelector(".main-form") as any;
    if (!form) return;
    const btnRemoveValue = form.querySelector(".btn-remove-form") as any;
    const actionTodo = form.querySelector(".action-todo") as any;

    btnRemoveValue.classList.remove("main-update");
    actionTodo.textContent = ACTION_FORM.ADD;
  };

  logOutView = (handle: any) => {
    const btnLogout = document.querySelector(".header-logout") as any;

    btnLogout.addEventListener("click", () => {
      clearLocalStorage(KEY.LOCALSTORAGE_UESR);

      if (typeof handle === "function") {
        handle();
      }
    });
  };

  disableTodoView = (clearDisable = false) => {
    const todoElm = document.querySelectorAll(".todo-item") as any;
    const inputMain = document.querySelector(".main-input") as any;

    [...todoElm].forEach((todo) => {
      if (!clearDisable) {
        todo.classList.add("disable");
        inputMain.classList.add("disable");
        todo.style.pointerEvents = "none";
        inputMain.style.pointerEvents = "none";
      } else {
        todo.classList.remove("disable");
        inputMain.classList.remove("disable");
        todo.style = "";
        inputMain.style.pointerEvents = "";
      }
    });
  };
}

export default TodoView;
