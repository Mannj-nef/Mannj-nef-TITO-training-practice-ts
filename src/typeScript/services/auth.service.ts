import axios from "axios";
import AuthSchema from "../models/authModel";

import AppView from "../views/appView";
import { KEY, PAGE } from "../constants/enum";
import MESSAGE from "../constants/message";
import { setLocalStorage } from "../helper/localStorage";
import TOAST from "../helper/toast";

class AuthService {
  user: any;
  AppView: any;
  endpoint: any;
  constructor() {
    this.user = {};
    this.AppView = new AppView();
    this.endpoint = `${process.env.BASE_URL}/users`;
  }

  async getUsers() {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.get(endpointUrl);
      return data;
    } catch (error) {
      this.AppView.createToast();
      return null;
    }
  }

  async findLoginUser({ email, password }: { email: any; password: any }) {
    const condition = (user: any) =>
      user.email === email && user.password === password;

    try {
      const user = await this.findUser(condition);

      if (!user) {
        this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_NOT_EXISTS));
        return null;
      }

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async fildEmailUser({ email }: { email: any }) {
    const condition = (user: any) => email === user.email;
    try {
      const user = await this.findUser(condition);

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async findUser(condition: any) {
    const users: any = await this.getUsers();
    const user: any = users.filter(condition);
    this.user = user.length > 0 ? new AuthSchema(user[0]) : {};

    return user;
  }

  async registerUser({ email, password }: { email: any; password: any }) {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.post(endpointUrl, { email, password });
      this.user = new AuthSchema(data);

      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  loginSuccess = (user: any) => {
    setLocalStorage(KEY.LOCALSTORAGE_UESR, user);
    this.AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));

    this.AppView.showPage("login", PAGE.TODO);
  };

  accountExists = (hasUser: any) => {
    if (hasUser.length > 0) {
      this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_EXISTS));
    }
  };
}

export default AuthService;
