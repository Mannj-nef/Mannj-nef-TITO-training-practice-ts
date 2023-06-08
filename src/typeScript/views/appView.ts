import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp";
import TodoPage from "./pages/TodoPage";
import { PAGE } from "../enums";
import debounce from "../helpers/debounce";
import handleGetElm from "../helpers/handleGetElm";

class AppView {
  private app: HTMLDivElement;
  private toast: HTMLDivElement;

  constructor() {
    this.app = handleGetElm<HTMLDivElement>("#root");
    this.toast = handleGetElm<HTMLDivElement>("#toast");
  }

  createTodoPage = (): void => {
    this.app.innerHTML = TodoPage();
  };

  createLogin = (): void => {
    this.app.innerHTML = LoginPage(SignIn, SignUp);
  };

  createToast = (data: string): void => {
    const toast = this.toast;
    toast.innerHTML = data;

    debounce(() => {
      toast.innerHTML = "";
    }, 4000);
  };

  showPage(classCurentPage: string, newPage: PAGE): void {
    const curentPage = document.querySelector(`.${classCurentPage}`);

    if (!curentPage) return;

    if (newPage === PAGE.TODO) {
      this.createTodoPage();
    } else if (newPage === PAGE.LOGIN) {
      this.createLogin();
    }
  }
}

export default AppView;
