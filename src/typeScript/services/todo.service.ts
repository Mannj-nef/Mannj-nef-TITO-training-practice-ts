import axios from "axios";
import AppView from "../views/appView";

import TodoSchema from "../models/todoModel";
import TOAST from "../helper/toast";
import MESSAGE from "../constants/message";

class TodoService {
  todos: any;
  AppView: any;
  endpoint: any;
  constructor() {
    this.todos = [];
    this.AppView = new AppView();
    this.endpoint = `${process.env.BASE_URL}/todoList`;
  }

  async getAlltodo() {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.get(endpointUrl);

      if (data) {
        this.todos = data.map((todo: any) => new TodoSchema(todo));
      }
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
    }
  }

  async getTodoByEmail(email: any) {
    const endpointUrl = `${this.endpoint}?email=${email}`;

    try {
      const { data } = await axios.get(endpointUrl);

      if (data) {
        this.todos = data.map((todo: any) => new TodoSchema(todo));
      }
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
    }
  }

  async addTodo(todo: any) {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.post(endpointUrl, todo);

      if (data) {
        this.todos.push(data);
      }
      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.ADD_TODO_SUCCESS));
      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async updateTodo(id: any, todoData: any) {
    const endpointUrl = `${this.endpoint}/${id}`;

    try {
      const { data } = await axios.patch(endpointUrl, todoData);
      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.UPDATE_TODO_SUCCESS));
      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async removeTodo(id: any) {
    const endpointUrl = `${this.endpoint}/${id}`;
    try {
      await axios.delete(endpointUrl);
      this.todos = this.todos.filter((todo: any) => todo.id !== id);
      this.AppView.createToast(TOAST.SUCCESS(MESSAGE.DELETE_TODO_SUCCESS));
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
    }
  }

  logoutSuccess = () => {
    this.AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGOUT_SUCCESS));
  };
}

export default TodoService;
