import AuthService from "../services/auth.service";
import AppView from "../views/appView";
import AuthView from "../views/authView";

export interface IAuth {
  id: number;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IAuthParam {
  AuthService: AuthService;
  AuthView: AuthView;
  AppView: AppView;
}
