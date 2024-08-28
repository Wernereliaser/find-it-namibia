import AppApi from "../api/AppApi";
import AppStore from "../store/AppStore";
import UiStore from "../store/UiStore";


export class MainApp {
  store: AppStore;
  api: AppApi;
  ui: UiStore;

  constructor() {
    this.store = new AppStore(this);
    this.api = new AppApi(this.store);
    this.ui = new UiStore();
  }
}