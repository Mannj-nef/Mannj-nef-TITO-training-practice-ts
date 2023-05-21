import { KEY } from "../enums";
import { getLocalStorage } from "../helpers/localStorage";
import { renderLoginPage, renderTodoPage } from "../helpers/renderPage";
import { AuthLocalStorage } from "../types";
import AppView from "../views/appView";

class AppController {
  private appView: AppView;

  constructor(appView: AppView) {
    this.appView = appView;

    this.handleCheckLogin();
  }

  handleCheckLogin() {
    const userJson: AuthLocalStorage = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (!userJson) {
      this.appView.createLogin();
      renderLoginPage();
    } else {
      this.appView.createTodoPage();
      renderTodoPage();
    }
  }
}

export default AppController;
