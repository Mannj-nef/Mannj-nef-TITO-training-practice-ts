import AppView from "../views/appView";

// auth
import AuthController from "../controllers/authController";
import AuthService from "../services/auth.service";
import AuthView from "../views/authView";
import { IAuthParam } from "../interfaces";

const authParam: IAuthParam = {
  AuthService: new AuthService(),
  AuthView: new AuthView(),
  AppView: new AppView(),
};

new AppView();
new AuthController(authParam);
