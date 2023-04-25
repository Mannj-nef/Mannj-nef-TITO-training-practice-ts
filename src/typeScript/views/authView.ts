import { handleFormLogin } from "../helper/form";
import { FORM } from "../constants/type";

class AuthView {
  constructor() {
    this.domloadLoginView();
  }

  domloadLoginView() {
    window.addEventListener("load", () => {
      this.handleChangeForm();
      this.handleShowPassword();
    });
  }

  handleChangeForm = () => {
    const loginPage = document.querySelector(".login") as any;
    if (!loginPage) return;
    const loginBg = document.querySelector(".login-bg") as any;

    // form login
    const loginForm = document.querySelector("#form-sign-in") as any;
    const registerElm = loginForm.querySelector(".register-link");

    // form register
    const regesterForm = document.querySelector("#form-sign-up") as any;
    const loginElm = regesterForm.querySelector(".login-link") as any;

    registerElm.addEventListener("click", () => {
      loginBg.classList.remove("login-bg-right");
    });

    loginElm.addEventListener("click", () => {
      loginBg.classList.add("login-bg-right");
    });
  };

  getLoginForm = (handler: any) => {
    const loginForm = document.querySelector("#form-sign-in") as any;
    if (loginForm) {
      handleFormLogin(loginForm, handler, FORM.LOGIN);
    }
  };

  getRegisterForm = (handler: any) => {
    const regesterForm = document.querySelector("#form-sign-up") as any;
    if (regesterForm) {
      handleFormLogin(regesterForm, handler, FORM.RESGITER);
    }
  };

  handleShowPassword = () => {
    // sign in
    const loginForm = document.querySelector("#form-sign-in") as any;
    const InputPasswordSignIn = document.querySelector(
      "#password-signIn"
    ) as any;
    // sign up
    const regesterForm = document.querySelector("#form-sign-up") as any;
    const InputPasswordSignUp = document.querySelector(
      "#password-signUp"
    ) as any;

    if (loginForm || regesterForm) {
      handleShow(loginForm, InputPasswordSignIn);
      handleShow(regesterForm, InputPasswordSignUp);
    }

    function handleShow(formElm: any, InputPassword: any) {
      const iconShow = formElm.querySelector(".show-password") as any;
      iconShow.addEventListener("click", () => {
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
