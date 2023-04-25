import ERROR_VALIDATE from "../constants/errorMessage";
import VALIDATE from "../constants/validateSchema";

const validateEvenError = {
  // even
  input: (name: any, textErrorElm: any) => {
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
  blur: (name: any, textErrorElm: any) => {
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

function validate(formElm: any, className: any) {
  const inputControls = formElm.querySelectorAll(className);

  [...inputControls].forEach((inputItem) => {
    inputItem.addEventListener("input", (e: any) =>
      handleInput(e, "input", inputControls)
    );
    inputItem.addEventListener("blur", (e: any) =>
      handleInput(e, "blur", inputControls)
    );
    inputItem.addEventListener("focus", (e: any) =>
      handleInput(e, "focus", inputControls)
    );
  });

  function handleInput(e: any, paramenter: any, inputs: any) {
    const inputPassword = inputs[1];
    const inputTarget = e.target;
    const textErrorElm = inputTarget.nextElementSibling;
    const valueInput = inputTarget.value;

    if (paramenter === "input") {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
      } else {
        validateEvenError.input(inputTarget.name, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "blur") {
      if (valueInput.length <= 0) {
        validateEvenError.blur(inputTarget.name, textErrorElm);
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "focus") {
      inputTarget.classList.remove("invalid");
    }
  }
}

function checkInput(inputTarget: any, value: any, inputPassword: any) {
  const regexEmail = VALIDATE.EMAIL;

  const inputName = inputTarget.name;
  const textErrorElm = inputTarget.nextElementSibling;

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

function handleValid(condition: any, input: any, classInvalid: any) {
  if (condition) {
    input.classList.remove(classInvalid);
  } else {
    input.classList.add(classInvalid);
  }
}

export { validate };
