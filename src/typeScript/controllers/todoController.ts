import { ACTION_FORM, KEY, PAGE } from "../constants/enum";
import { ITodo, ITodoParam } from "../constants/interface";
import { handleCreateId } from "../helper/createId";
import { getLocalStorage, clearLocalStorage } from "../helper/localStorage";

import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import TodoView from "../views/todoView";

class TodoController {
  service: TodoService;
  view: TodoView;
  appView: AppView;

  constructor({ TodoService, TodoView, AppView }: ITodoParam) {
    this.service = TodoService;
    this.view = TodoView;
    this.appView = AppView;
  }

  handleRenderTodo = async (): Promise<void> => {
    const TodoView = this.view;
    TodoView.logOutView(this.handleLogout);

    await this.handleGetTodos();

    TodoView.getValueUpdateTodoView();
    TodoView.getValueInput(this.handlesubmit);
    TodoView.getIdDeleteTodo(this.handleRemoveTodo);
    TodoView.activeTodoWhenDone(this.handleActiveWhenDone);
  };

  renderNewTodoWhenChange() {
    const TodoView = this.view;

    TodoView.getValueUpdateTodoView();
    TodoView.getIdDeleteTodo(this.handleRemoveTodo);
    TodoView.activeTodoWhenDone(this.handleActiveWhenDone);
  }

  handleGetTodos = async (): Promise<void> => {
    const TodoService = this.service;

    const TodoView = this.view;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (user) {
      await TodoService.getTodoByEmail(user.email);
    }
    TodoView.displayTodos(TodoService.todos);
  };

  handlesubmit = (todo: string, action: ACTION_FORM) => {
    if (action === ACTION_FORM.ADD) {
      this.handleAddTodo(todo);
    } else if (action === ACTION_FORM.UPDATE) {
      this.handleUpdateTodo(todo);
    }
  };

  handleAddTodo = async (todo: string): Promise<void> => {
    const TodoService = this.service;
    const TodoView = this.view;

    const { email } = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    const todoItem: ITodo = {
      id: handleCreateId(),
      email,
      title: todo,
      complete: false,
    };

    TodoView.disableTodoView(true);
    const data = await TodoService.addTodo(todoItem);

    if (data) {
      // get id of new todo when add
      TodoView.displayTodos(TodoService.todos);
    }
    this.renderNewTodoWhenChange();
  };

  handleUpdateTodo = async (todo: string): Promise<void> => {
    const TodoService = this.service;
    const TodoView = this.view;
    const id = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

    this.view.disableTodoView(true);

    const data = await TodoService.updateTodo(id, { title: todo });

    if (data) {
      TodoService.todos.forEach((itemTodo: ITodo) => {
        if (itemTodo.id === id) {
          itemTodo.title = todo;
        }
      });
      TodoView.resetFormTodoView();
      clearLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);
      // get id of new todo when add
      TodoView.displayTodos(TodoService.todos);
    }
    this.renderNewTodoWhenChange();
  };

  handleActiveWhenDone = async (id: string, status: boolean): Promise<void> => {
    const TodoService = this.service;
    const TodoView = this.view;

    const clearDisable = true;

    await TodoService.updateTodo(id, { complete: status });

    TodoView.disableTodoView(clearDisable);
  };

  handleRemoveTodo = async (id: string): Promise<void> => {
    const TodoService = this.service;
    const TodoView = this.view;

    const clearDisable = true;

    if (id) {
      const numberId = id;
      await TodoService.removeTodo(numberId);

      const idTodoLocalStorege = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

      if (id === idTodoLocalStorege) {
        TodoView.resetFormTodoView();
      }
    }
    TodoView.displayTodos(TodoService.todos);
    TodoView.disableTodoView(clearDisable);
    this.renderNewTodoWhenChange();
  };

  handleLogout = () => {
    const AppView = this.appView;
    const TodoService = this.service;

    window.location.search = "";
    AppView.showPage("todo-page", PAGE.LOGIN);
    TodoService.logoutSuccess();
  };
}
export default TodoController;
