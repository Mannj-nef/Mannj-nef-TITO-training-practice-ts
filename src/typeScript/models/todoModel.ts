import { ITodo } from "../interfaces";

class TodoSchema {
  id: string;
  email: string;
  title: string;
  complete: boolean;
  constructor({ id, email, title, complete }: ITodo) {
    this.id = id;
    this.email = email;
    this.title = title;
    this.complete = complete;
  }
}

export default TodoSchema;
