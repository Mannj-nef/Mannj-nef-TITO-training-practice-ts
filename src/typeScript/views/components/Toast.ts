import { TOAST } from "../../constants/enum";

function Toast(
  type: string = "error",
  message: string = "TypeError: Failed to fetch"
) {
  const icons: any = {
    [TOAST.SUCCESS]: "ti-check",
    [TOAST.ERROR]: "ti-close",
  };
  const icon = icons[type];

  return `
    <div class="toast-item toast-${type}">
        <div class="toast-icon">
        <i class="${icon}"></i>
        </div>
        <p class="toast-desc">${message}</p>
      </div>
    `;
}
export default Toast;
