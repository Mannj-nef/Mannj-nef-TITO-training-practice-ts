import axios from "axios";
import AuthSchema from "../models/authModel";

import AppView from "../views/appView";
import { KEY, PAGE } from "../enums";
import MESSAGE from "../constants/message";
import { setLocalStorage } from "../helpers/localStorage";
import TOAST from "../helpers/toast";
import { IAuth } from "../interfaces";
import { AuthLocalStorage, AuthLogin } from "../types";

class AuthService {
  public user: IAuth | {};
  private AppView: AppView;
  private endpoint: string;

  constructor() {
    this.user = {};
    this.AppView = new AppView();
    this.endpoint = `${process.env.BASE_URL}/users`;
  }

  async getUsers(): Promise<IAuth[]> {
    const endpointUrl = this.endpoint;

    try {
      const { data }: { data: IAuth[] } = await axios.get(endpointUrl);
      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  async findLoginUser({ email, password }: AuthLogin): Promise<IAuth> {
    const condition = (user: IAuth) =>
      user.email === email && user.password === password;

    try {
      const user = await this.findUser(condition);

      if (!user) {
        this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_NOT_EXISTS));
      }

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  async fildEmailUser({ email }: { email: string }): Promise<IAuth> {
    const condition = (user: IAuth) => email === user.email;
    try {
      const user = await this.findUser(condition);

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  async findUser(condition: (user: IAuth) => boolean): Promise<IAuth> {
    const users = await this.getUsers();
    const user = users.filter(condition);

    this.user = user.length > 0 ? new AuthSchema(user[0]) : {};

    return user[0];
  }

  async registerUser({ email, password }: AuthLogin): Promise<IAuth> {
    const endpointUrl = this.endpoint;

    try {
      const { data }: { data: IAuth } = await axios.post(endpointUrl, {
        email,
        password,
      });
      this.user = new AuthSchema(data);

      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error as string));
      throw error;
    }
  }

  loginSuccess = (user: AuthLocalStorage): void => {
    setLocalStorage(KEY.LOCALSTORAGE_USER, user);
    this.AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));

    this.AppView.showPage("login", PAGE.TODO);
  };

  accountExists = (hasUser: IAuth): void => {
    if (!hasUser) return;
    this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_EXISTS));
  };
}

export default AuthService;
