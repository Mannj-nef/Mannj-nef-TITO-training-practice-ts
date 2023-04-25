import Toast from "../views/components/Toast";
import { TOAST as TOAST_TYPE } from "../constants/enum";

const TOAST = {
  SUCCESS: (message: any) => {
    const type = TOAST_TYPE.SUCCESS;
    return Toast(type, message);
  },

  ERROR: (message: any) => {
    const type = TOAST_TYPE.ERROR;
    return Toast(type, message);
  },
};

export default TOAST;
