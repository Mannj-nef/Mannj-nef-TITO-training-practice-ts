import { handleFormLogin } from "../helpers/form";
import { FORM } from "../enums";
import { AuthForm, AuthLogin } from "../types";
import handleGetElm from "../helpers/handleGetElm";

class AuthView {
  private loginPage: HTMLDivElement;
  private loginBg: HTMLDivElement;
  private loginForm: HTMLFormElement;
  private registerElm: HTMLSpanElement;
  private regesterForm: HTMLFormElement;
  private loginElm: HTMLSpanElement;
  private inputPasswordSignIn: HTMLInputElement;
  private inputPasswordSignUp: HTMLInputElement;

  constructor() {
    this.loginPage = handleGetElm<HTMLDivElement>(".login");
    this.loginBg = handleGetElm<HTMLDivElement>(".login-bg");
    this.loginForm = handleGetElm<HTMLFormElement>("#form-sign-in");
    this.regesterForm = handleGetElm<HTMLFormElement>("#form-sign-up");
    this.registerElm = handleGetElm<HTMLFormElement>(".register-link");
    this.loginElm = handleGetElm<HTMLFormElement>(".login-link");

    this.inputPasswordSignIn =
      handleGetElm<HTMLInputElement>("#password-signIn");
    this.inputPasswordSignUp =
      handleGetElm<HTMLInputElement>("#password-signUp");
  }

  handleChangeForm = (): void => {
    const loginPage = this.loginPage;

    if (!loginPage) return;
    const loginBg = this.loginBg;

    this.registerElm.addEventListener("click", (): void => {
      loginBg.classList.remove("login-bg-right");
    });

    this.loginElm.addEventListener("click", (): void => {
      loginBg.classList.add("login-bg-right");
    });
  };

  getLoginForm = (handler: (data: AuthLogin) => Promise<void>): void => {
    const loginForm = this.loginForm;

    if (!loginForm) return;
    handleFormLogin(loginForm, handler, FORM.LOGIN);
  };

  getRegisterForm = (handler: (data: AuthForm) => Promise<void>): void => {
    const regesterForm = this.regesterForm;

    if (!regesterForm) return;
    handleFormLogin(regesterForm, handler, FORM.RESGITER);
  };

  handleShowPassword = (): void => {
    // sign in
    const loginForm = this.loginForm;
    const inputPasswordSignIn = this.inputPasswordSignIn;

    // sign up
    const regesterForm = this.regesterForm;
    const inputPasswordSignUp = this.inputPasswordSignUp;

    const handleShow = (
      formElm: HTMLFormElement,
      InputPassword: HTMLInputElement
    ): void => {
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
    };

    if (loginForm || regesterForm) {
      handleShow(loginForm, inputPasswordSignIn);
      handleShow(regesterForm, inputPasswordSignUp);
    }
  };
}

export default AuthView;
