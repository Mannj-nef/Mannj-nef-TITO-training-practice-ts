import AuthService from "../services/auth.service";
import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import AuthView from "../views/authView";
import TodoView from "../views/todoView";

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

// todo
export interface ITodo {
  id: string;
  email: string;
  title: string;
  complete: boolean;
}

export interface ITodoParam {
  TodoService: TodoService;
  TodoView: TodoView;
  AppView: AppView;
}
