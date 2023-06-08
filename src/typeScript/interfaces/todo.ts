import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import TodoView from "../views/todoView";

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
