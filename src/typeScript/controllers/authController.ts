import { KEY } from "../enums";
import { getLocalStorage } from "../helper/localStorage";

import AuthService from "../services/auth.service";
import AuthView from "../views/authView";
import AppView from "../views/appView";

import { AuthForm, AuthLocalStorage, AuthLogin } from "../constants/types";
import { IAuth, IAuthParam } from "../constants/interface";
import renderTodo from "../helper/renderTodo";

class AuthController {
  service: AuthService;
  view: AuthView;
  appView: AppView;

  constructor(props: IAuthParam) {
    this.service = props.AuthService;
    this.view = props.AuthView;
    this.appView = props.AppView;

    this.handleCheckLogin();
    this.view.getLoginForm(this.handleLogin);
    this.view.getRegisterForm(this.handleRegister);
  }

  handleLogin = async (data: AuthLogin): Promise<void> => {
    const Auth = this.service;

    const user = await Auth.findLoginUser(data);

    if (user) {
      this.handleLoginSuccess(user);
    }
  };

  handleRegister = async (data: AuthForm): Promise<void> => {
    const Auth = this.service;

    const hasUser = await Auth.fildEmailUser(data);

    if (hasUser) {
      Auth.accountExists(hasUser);
    } else {
      const user = await Auth.registerUser(data);
      if (user) {
        this.handleLoginSuccess(user);
      }
    }
  };

  handleLoginSuccess(user: AuthLocalStorage): void {
    const AuthService = this.service;

    // delete password before saving in localStorage
    delete user.password;
    AuthService.loginSuccess(user);

    if (user) {
      renderTodo();
    }
  }

  handleCheckLogin = async (): Promise<void> => {
    const Auth = this.service;
    const AppView = this.appView;

    const userJson: AuthLocalStorage = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (!userJson) {
      AppView.createLogin();
      return;
    }

    const user = await Auth.fildEmailUser(userJson);
    if (user) {
      AppView.createTodoPage();
      renderTodo();
    }
  };
}

export default AuthController;
