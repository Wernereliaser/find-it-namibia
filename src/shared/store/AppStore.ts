
import { MainApp } from "../model/App";
import AuthStore from "./AuthStore";
import PropertyStore from "./PropertyStore";
import UserStore from "./UserStore";

export default class AppStore {
  app: MainApp;
  auth = new AuthStore(this);
  user = new UserStore(this);
  property = new PropertyStore(this);

  constructor(app: MainApp) {
    this.app = app;
  }
}
