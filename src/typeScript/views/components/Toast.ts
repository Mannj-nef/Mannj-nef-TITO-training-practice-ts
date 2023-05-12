import { TOAST } from "../../constants/enum";

interface IIcon {
  success: "ti-check";
  error: "ti-close";
}

function Toast(
  type: string = "error",
  message: string = "TypeError: Failed to fetch"
) {
  const icons: IIcon = {
    [TOAST.SUCCESS]: "ti-check",
    [TOAST.ERROR]: "ti-close",
  };
  const icon: "ti-check" | "ti-close" = icons[type as TOAST];

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
