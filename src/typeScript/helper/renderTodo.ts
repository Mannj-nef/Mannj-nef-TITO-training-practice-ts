import { ITodoParam } from "../constants/interface";
import TodoController from "../controllers/todoController";
import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import TodoView from "../views/todoView";

const renderTodo = (): void => {
  const todoParam: ITodoParam = {
    TodoService: new TodoService(),
    TodoView: new TodoView(),
    AppView: new AppView(),
  };
  const todoControll = new TodoController(todoParam);

  todoControll.handleRenderTodo();
};

export default renderTodo;
