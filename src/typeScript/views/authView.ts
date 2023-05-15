import { handleFormLogin } from "../helper/form";
import { FORM } from "../enums";
import { AuthForm, AuthLogin } from "../constants/types";

class AuthView {
  constructor() {
    this.domloadLoginView();
  }

  domloadLoginView(): void {
    window.addEventListener("load", () => {
      this.handleChangeForm();
      this.handleShowPassword();
    });
  }

  handleChangeForm = (): void => {
    const loginPage = document.querySelector(".login") as HTMLDivElement;
    if (!loginPage) return;
    const loginBg = document.querySelector(".login-bg") as HTMLDivElement;

    // form login
    const loginForm = document.querySelector(
      "#form-sign-in"
    ) as HTMLFormElement;
    const registerElm = loginForm.querySelector(
      ".register-link"
    ) as HTMLElement;

    // form register
    const regesterForm = document.querySelector(
      "#form-sign-up"
    ) as HTMLFormElement;
    const loginElm = regesterForm.querySelector(
      ".login-link"
    ) as HTMLSpanElement;

    registerElm.addEventListener("click", (): void => {
      loginBg.classList.remove("login-bg-right");
    });

    loginElm.addEventListener("click", (): void => {
      loginBg.classList.add("login-bg-right");
    });
  };

  getLoginForm = (handler: (data: AuthLogin) => Promise<void>): void => {
    const loginForm = document.querySelector(
      "#form-sign-in"
    ) as HTMLFormElement;
    if (loginForm) {
      handleFormLogin(loginForm, handler, FORM.LOGIN);
    }
  };

  getRegisterForm = (handler: (data: AuthForm) => Promise<void>): void => {
    const regesterForm = document.querySelector(
      "#form-sign-up"
    ) as HTMLFormElement;
    if (regesterForm) {
      handleFormLogin(regesterForm, handler, FORM.RESGITER);
    }
  };

  handleShowPassword = (): void => {
    // sign in
    const loginForm = document.querySelector(
      "#form-sign-in"
    ) as HTMLFormElement;
    const InputPasswordSignIn = document.querySelector(
      "#password-signIn"
    ) as HTMLInputElement;
    // sign up
    const regesterForm = document.querySelector(
      "#form-sign-up"
    ) as HTMLFormElement;
    const InputPasswordSignUp = document.querySelector(
      "#password-signUp"
    ) as HTMLInputElement;

    if (loginForm || regesterForm) {
      handleShow(loginForm, InputPasswordSignIn);
      handleShow(regesterForm, InputPasswordSignUp);
    }

    function handleShow(
      formElm: HTMLFormElement,
      InputPassword: HTMLInputElement
    ): void {
      const iconShow = formElm.querySelector(
        ".show-password"
      ) as HTMLDivElement;
      iconShow.addEventListener("click", (): void => {
        const inputType = InputPassword.getAttribute("type");
        if (inputType === "password") {
          InputPassword.setAttribute("type", "text");
        } else {
          InputPassword.setAttribute("type", "password");
        }
      });
    }
  };
}

export default AuthView;
