import axios from "axios";
import AppView from "../views/appView";

import TodoSchema from "../models/todoModel";
import TOAST from "../helpers/toast";
import MESSAGE from "../constants/message";
import { ITodo } from "../interfaces";
import { TodoData } from "../types";

class TodoService {
  public todos: ITodo[];
  private AppView: AppView;
  private endpoint: string;
  constructor() {
    this.todos = [];
    this.AppView = new AppView();
    this.endpoint = `${process.env.BASE_URL}/todoList`;
  }

  async getAlltodo(): Promise<void> {
    const endpointUrl = this.endpoint;

    try {
      const { data }: { data: ITodo[] } = await axios.get(endpointUrl);

      if (!data) return;

      this.todos = data.map((todo: ITodo) => new TodoSchema(todo));
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
    }
  }

  async getTodoByEmail(email: string): Promise<void> {
    const endpointUrl = `${this.endpoint}?email=${email}`;

    try {
      const { data }: { data: ITodo[] } = await axios.get(endpointUrl);

      if (!data) return;

      this.todos = data.map((todo: ITodo) => new TodoSchema(todo));
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
    }
  }

  async addTodo(todo: ITodo): Promise<ITodo> {
    const endpointUrl = this.endpoint;

    try {
      const { data }: { data: ITodo } = await axios.post(endpointUrl, todo);

      if (data) {
        this.todos.push(data);
      }

      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.ADD_TODO_SUCCESS));
      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  async updateTodo(id: string, todoData: TodoData): Promise<ITodo> {
    const endpointUrl = `${this.endpoint}/${id}`;

    try {
      const { data }: { data: ITodo } = await axios.patch(
        endpointUrl,
        todoData
      );
      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.UPDATE_TODO_SUCCESS));
      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  async removeTodo(id: string): Promise<void> {
    const endpointUrl = `${this.endpoint}/${id}`;
    try {
      await axios.delete(endpointUrl);
      this.todos = this.todos.filter((todo: ITodo) => todo.id !== id);
      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.DELETE_TODO_SUCCESS));
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
    }
  }

  logoutSuccess = (): void => {
    this.AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGOUT_SUCCESS));
  };
}

export default TodoService;
