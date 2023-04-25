import { FORM } from "../constants/type";
import debounce from "./debounce";
import { validate } from "./validate";

export const handleFormLogin = (
  formElm: any,
  handler: any,
  type: any = FORM.LOGIN
) => {
  const formClassName = ".form-input";
  validate(formElm, formClassName);

  formElm.addEventListener("submit", function (e: any) {
    const inputElms = formElm.querySelectorAll(".form-input");
    e.preventDefault();

    const valueItem: any = {
      email: formElm.elements.email.value.trim().toLowerCase(),
      password: formElm.elements.password.value.trim(),
    };

    if (type === FORM.RESGITER) {
      valueItem.confirmPassword = formElm.elements["confirm-password"].value;
    }

    const invalid = [...inputElms].some((item) =>
      item.classList.contains("invalid")
    );
    const emptyValue: boolean = Object.values(valueItem).some(
      (value: any) => value <= 0
    );

    if (!invalid && !emptyValue) {
      const button = formElm.querySelector(".submit-form") as any;
      button.classList.add("button-loading");

      const submitForm = () => {
        button.classList.remove("button-loading");

        if (typeof handler === "function") {
          handler(valueItem);
        }
      };
      debounce(submitForm, 2000);
    }
  });
};

export const handleFormTodo = (formElm: any, disableElm: any, handle: any) => {
  formElm.addEventListener("submit", function (e: any) {
    e.preventDefault();
    const actionElm = formElm.querySelector(".action-todo") as any;
    const input = formElm.elements["input-todo"];

    const action = actionElm.textContent;
    const inputValue = input.value.trim();

    if (inputValue <= 0) {
      input.value = "";
      return;
    }

    const button = formElm.querySelector(".main-btn") as any;
    button.classList.add("button-loading");
    const handleSubmit = () => {
      button.classList.remove("button-loading");
      if (typeof handle === "function") {
        handle(inputValue, action);
        input.value = "";
      }
    };

    disableElm();

    debounce(handleSubmit, 800);
  });
};
