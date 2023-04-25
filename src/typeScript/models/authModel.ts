interface IAuthSchema {
  id: any;
  email: any;
  password: any;
}

class AuthSchema {
  id: any;
  email: any;
  password: any;
  constructor({ id, email, password }: IAuthSchema) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

export default AuthSchema;
