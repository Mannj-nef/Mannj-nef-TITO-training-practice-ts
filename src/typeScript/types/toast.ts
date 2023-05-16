import { TOAST } from "../enums";

export type Toast = {
  [key in keyof typeof TOAST]: (message: string) => string;
};
