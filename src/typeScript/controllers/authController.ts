import AuthService from "../services/auth.service";
import AuthView from "../views/authView";
import AppView from "../views/appView";

import { AuthForm, AuthLocalStorage, AuthLogin } from "../types";
import { IAuthParam } from "../interfaces";
import { renderTodoPage } from "../helpers/renderPage";

class AuthController {
  private service: AuthService;
  private view: AuthView;

  constructor(props: IAuthParam) {
    this.service = props.AuthService;
    this.view = props.AuthView;
  }

  handleRenderView = () => {
    this.view.handleChangeForm();
    this.view.handleShowPassword();
    this.view.getLoginForm(this.handleLogin);
    this.view.getRegisterForm(this.handleRegister);
  };

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
      renderTodoPage();
    }
  }
}

export default AuthController;
