import ERROR_VALIDATE from "../constants/errorMessage";
import { Form } from "../constants/types";
import VALIDATE from "../constants/validateSchema";

const validateEvenError = {
  // even
  input: (name: Form, textErrorElm: HTMLElement) => {
    switch (name) {
      case "email":
        textErrorElm.textContent = ERROR_VALIDATE.EMAIL_NOT_VALID;
        break;
      case "password":
        textErrorElm.textContent = ERROR_VALIDATE.PASS_MIN_LENGTH;
        break;
      default:
        break;
    }
  },
  blur: (name: Form, textErrorElm: HTMLElement) => {
    switch (name) {
      case "email":
        textErrorElm.textContent = ERROR_VALIDATE.EMAIL_REQUIRED;
        break;
      case "password":
        textErrorElm.textContent = ERROR_VALIDATE.PASS_REQUIRED;
        break;
      default:
        break;
    }
  },
};

function validate(formElm: HTMLFormElement, className: string) {
  const inputControls = formElm.querySelectorAll(
    className
  ) as NodeListOf<HTMLInputElement>;

  [...inputControls].forEach((inputItem) => {
    inputItem.addEventListener("input", (e: Event) =>
      handleInput(e, "input", inputControls)
    );
    inputItem.addEventListener("blur", (e: FocusEvent) =>
      handleInput(e, "blur", inputControls)
    );
    inputItem.addEventListener("focus", (e: FocusEvent) =>
      handleInput(e, "focus", inputControls)
    );
  });

  function handleInput(
    e: Event,
    paramenter: Form,
    inputs: NodeListOf<HTMLInputElement>
  ) {
    const inputPassword = inputs[1];
    const inputTarget = e.target as HTMLInputElement;
    const textErrorElm = inputTarget.nextElementSibling as HTMLElement;
    const valueInput = inputTarget.value;

    if (paramenter === "input") {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
      } else {
        validateEvenError.input(inputTarget.name as Form, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "blur") {
      if (valueInput.length <= 0) {
        validateEvenError.blur(inputTarget.name as Form, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "focus") {
      inputTarget.classList.remove("invalid");
    }
  }
}

function checkInput(
  inputTarget: HTMLInputElement,
  value: string,
  inputPassword: HTMLInputElement
) {
  const regexEmail = VALIDATE.EMAIL;

  const textErrorElm = inputTarget.nextElementSibling as HTMLDivElement;
  const inputName = inputTarget.name;

  switch (inputName) {
    case "email": {
      const validateEmail = regexEmail.test(value);
      handleValid(validateEmail, inputTarget, "invalid");
      break;
    }
    case "password" || "text": {
      const validatePassword = value.length >= VALIDATE.PASS_MIN;
      handleValid(validatePassword, inputTarget, "invalid");
      break;
    }
    case "confirm-password": {
      const passwordValue = inputPassword.value;
      const validateConfirmPassword = value === passwordValue;
      handleValid(validateConfirmPassword, inputTarget, "invalid");
      textErrorElm.textContent = ERROR_VALIDATE.PASS_NOT_MATCH;
      break;
    }

    default:
      break;
  }
}

function handleValid(
  condition: boolean,
  input: HTMLInputElement,
  classInvalid: string
) {
  if (condition) {
    input.classList.remove(classInvalid);
  } else {
    input.classList.add(classInvalid);
  }
}

export { validate };
