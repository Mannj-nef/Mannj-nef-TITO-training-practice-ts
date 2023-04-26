import AppView from "../views/appView";

// auth
import AuthController from "../controllers/authController";
import AuthService from "../services/auth.service";
import AuthView from "../views/authView";
import { IAuthParam } from "../constants/interface";

const authParam: IAuthParam = {
  AuthService: new AuthService(),
  AuthView: new AuthView(),
  AppView: new AppView(),
};

// eslint-disable-next-line no-unused-vars
const app: AppView = new AppView();
// eslint-disable-next-line no-unused-vars
const auth: AuthController = new AuthController(authParam);
