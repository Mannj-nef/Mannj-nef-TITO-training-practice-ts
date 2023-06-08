import { IAuth } from "../interfaces";

export type AuthLogin = Omit<IAuth, "id" | "confirmPassword">;
export type AuthLocalStorage = Omit<IAuth, "password" | "confirmPassword"> & {
  password?: string;
};
export type AuthForm = Omit<IAuth, "id">;
