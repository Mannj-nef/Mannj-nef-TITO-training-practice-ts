import { FORM, FORM_EVEN } from "../enums";
import { ERROR_VALIDATE } from "../constants/message";
import VALIDATE from "../constants/validateSchema";

const validateEvenError = {
  // even
  input: (name: FORM, textErrorElm: HTMLElement) => {
    switch (name) {
      case FORM.EMAIL:
        textErrorElm.textContent = ERROR_VALIDATE.EMAIL_NOT_VALID;
        break;
      case FORM.PASSWORD:
      default:
        textErrorElm.textContent = ERROR_VALIDATE.PASS_MIN_LENGTH;
        break;
    }
  },
  blur: (name: FORM, textErrorElm: HTMLElement) => {
    switch (name) {
      case FORM.EMAIL:
        textErrorElm.textContent = ERROR_VALIDATE.EMAIL_REQUIRED;
        break;
      case FORM.PASSWORD:
      default:
        textErrorElm.textContent = ERROR_VALIDATE.PASS_REQUIRED;
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
      handleInput(e, FORM_EVEN.INPUT, inputControls)
    );
    inputItem.addEventListener("blur", (e: FocusEvent) =>
      handleInput(e, FORM_EVEN.BLUR, inputControls)
    );
    inputItem.addEventListener("focus", (e: FocusEvent) =>
      handleInput(e, FORM_EVEN.FOCUS, inputControls)
    );
  });

  function handleInput(
    e: Event,
    paramenter: FORM_EVEN,
    inputs: NodeListOf<HTMLInputElement>
  ) {
    const inputPassword = inputs[1];
    const inputTarget = e.target as HTMLInputElement;
    const textErrorElm = inputTarget.nextElementSibling as HTMLElement;
    const valueInput = inputTarget.value;

    if (paramenter === FORM_EVEN.INPUT) {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
      } else {
        validateEvenError.input(inputTarget.name as FORM, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === FORM_EVEN.BLUR) {
      if (valueInput.length <= 0) {
        validateEvenError.blur(inputTarget.name as FORM, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === FORM_EVEN.FOCUS) {
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
  const inputName = inputTarget.name as FORM;

  switch (inputName) {
    case FORM.EMAIL: {
      const validateEmail = regexEmail.test(value);
      handleValid(validateEmail, inputTarget, "invalid");
      break;
    }
    case FORM.PASSWORD || "text": {
      const validatePassword = value.length >= VALIDATE.PASS_MIN;
      handleValid(validatePassword, inputTarget, "invalid");
      break;
    }
    case FORM.CONFIRMPASSWORD:
    default: {
      const passwordValue = inputPassword.value;
      const validateConfirmPassword = value === passwordValue;
      handleValid(validateConfirmPassword, inputTarget, "invalid");
      textErrorElm.textContent = ERROR_VALIDATE.PASS_NOT_MATCH;
      break;
    }
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
