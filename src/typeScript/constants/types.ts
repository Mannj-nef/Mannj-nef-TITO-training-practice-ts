import { TOAST } from "./enum";
import { IAuth, IForm, ITodo } from "./interface";

export type localStorageData = AuthLocalStorage | string;
export type Form = IForm[keyof IForm];
export type Toast = {
  [key in keyof typeof TOAST]: (message: string) => string;
};

// type auth
export type AuthLogin = Omit<IAuth, "id" | "confirmPassword">;
export type AuthLocalStorage = Omit<IAuth, "password" | "confirmPassword"> & {
  password?: string;
};
export type AuthForm = Omit<IAuth, "id">;

// type todo
export type TodoData = { title: string } | { complete: boolean };
export type TodoItem = Omit<ITodo, "email">;
