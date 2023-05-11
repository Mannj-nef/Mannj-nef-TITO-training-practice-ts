import { IAuth } from "./interface";

export type AuthLogin = Omit<IAuth, "id" | "confirmPassword">;
export type AuthLocalStorage = Omit<IAuth, "password" | "confirmPassword"> & {
  password?: string;
};
export type AuthForm = Omit<IAuth, "id">;

export type TodoData = { title: string } | { complete: boolean };
