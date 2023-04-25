import { KEY } from "../constants/type";
import { getLocalStorage } from "../helper/localStorage";

interface IAuthController {
  AuthService: any;
  AuthView: any;
  AppView: any;
  TodoController: any;
  TodoService: any;
  TodoView: any;
}

class AuthController {
  service: any;
  view: any;
  appView: any;
  todoControll: any;
  todoService: any;
  todoView: any;
  constructor({
    AuthService,
    TodoController,
    TodoService,
    TodoView,
    AppView,
    AuthView,
  }: IAuthController) {
    this.service = AuthService;
    this.view = AuthView;
    this.appView = AppView;

    this.todoControll = TodoController;
    this.todoService = TodoService;
    this.todoView = TodoView;

    this.handleCheckLogin();
    this.view.getLoginForm(this.handleLogin);
    this.view.getRegisterForm(this.handleRegister);
  }

  handleLogin = async (data: any) => {
    const Auth = this.service;

    const [user] = await Auth.findLoginUser(data);
    if (user) {
      this.handleLoginSuccess(user);
    }
  };

  handleRegister = async (data: any) => {
    const Auth = this.service;

    const hasUser = await Auth.fildEmailUser(data);
    Auth.accountExists(hasUser);

    const user = await Auth.registerUser(data);
    if (user) {
      this.handleLoginSuccess(user);
    }
  };

  handleLoginSuccess(user: any) {
    const AppView = this.appView;
    const AuthService = this.service;
    const TodoService = this.todoService;
    const TodoView = this.todoView;
    const TodoController = this.todoControll;

    delete user.password;
    AuthService.loginSuccess(user);

    if (user) {
      const todoControll = new TodoController(
        new TodoService(),
        new TodoView(),
        AppView
      );

      todoControll.handleRenderTodo();
    }
  }

  handleCheckLogin = async () => {
    const Auth = this.service;
    const AppView = this.appView;
    const TodoService = this.todoService;
    const TodoView = this.todoView;
    const TodoController = this.todoControll;

    const userJson = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (!userJson) {
      AppView.createLogin();
      return;
    }

    const user = await Auth.fildEmailUser(userJson);
    if (user) {
      AppView.createTodoPage();
      const todoControll = new TodoController(
        new TodoService(),
        new TodoView(),
        AppView
      );

      todoControll.handleRenderTodo();
    }
  };
}

export default AuthController;
