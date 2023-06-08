import { IAuthParam, ITodoParam } from "../interfaces";
import TodoController from "../controllers/todoController";
import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import TodoView from "../views/todoView";
import AuthService from "../services/auth.service";
import AuthView from "../views/authView";
import AuthController from "../controllers/authController";

const renderTodoPage = (): void => {
  const todoParam: ITodoParam = {
    TodoService: new TodoService(),
    TodoView: new TodoView(),
    AppView: new AppView(),
  };
  const todoControll = new TodoController(todoParam);
  todoControll.handleRenderTodo();
};

const renderLoginPage = (): void => {
  const authParam: IAuthParam = {
    AuthService: new AuthService(),
    AuthView: new AuthView(),
    AppView: new AppView(),
  };
  const authControl = new AuthController(authParam);
  authControl.handleRenderView();
};

export { renderTodoPage, renderLoginPage };
