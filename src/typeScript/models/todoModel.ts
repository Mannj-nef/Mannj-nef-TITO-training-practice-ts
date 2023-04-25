interface ITodoSchema {
  id: any;
  email: any;
  title: any;
  complete: any;
}

class TodoSchema {
  id: any;
  email: any;
  title: any;
  complete: any;
  constructor({ id, email, title, complete }: ITodoSchema) {
    this.id = id;
    this.email = email;
    this.title = title;
    this.complete = complete;
  }
}

export default TodoSchema;
