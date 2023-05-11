import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp";
import TodoPage from "./pages/TodoPage";
import { PAGE } from "../constants/enum";
import debounce from "../helper/debounce";
import { Toast } from "../constants/types";

class AppView {
  createLogin = (): void => {
    const app = document.getElementById("root") as HTMLDivElement;
    app.innerHTML = LoginPage(SignIn, SignUp);
  };

  createTodoPage = (): void => {
    const app = document.getElementById("root") as HTMLDivElement;
    app.innerHTML = TodoPage();
  };

  createToast = (data: string): void => {
    const toast = document.getElementById("toast") as HTMLDivElement;
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
