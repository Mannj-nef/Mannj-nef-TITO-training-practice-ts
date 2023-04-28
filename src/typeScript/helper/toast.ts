import Toast from "../views/components/Toast";
import { TOAST as TOAST_TYPE } from "../constants/enum";

const TOAST = {
  SUCCESS: (message: string) => {
    const type = TOAST_TYPE.SUCCESS;
    return Toast(type, message);
  },

  ERROR: (message: string) => {
    const type = TOAST_TYPE.ERROR;
    return Toast(type, message);
  },
};

export default TOAST;
