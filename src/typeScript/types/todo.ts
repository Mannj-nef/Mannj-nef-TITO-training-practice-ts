import { ITodo } from "../interfaces";

export type TodoData = { title: string } | { complete: boolean };
export type TodoItem = Omit<ITodo, "email">;
