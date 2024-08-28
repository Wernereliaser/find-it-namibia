import { makeObservable, runInAction } from "mobx";
import AppStore from "./AppStore";
import { IUser, UserModel } from "../model/User";

export default class AuthStore {
  protected store: AppStore;
  me: UserModel | null = null;
  loading: boolean = true;

  constructor(store: AppStore) {
    makeObservable(this, {
      me: true,
      loading: true,
      meJson: true,
    });
    this.store = store;
  }

  get meJson() {
    return this.me ? this.me.asJson : null;
  }

  get role() {
    const _role = this.me ? this.me.asJson.role : "Employee";
    return _role
  }

  setLoading(loading: boolean) {
    runInAction(() => {
      this.loading = loading;
    });
  }

  login(item: IUser) {
    runInAction(() => {
      this.me = new UserModel(this.store, item);
    });
  }

  logout() {
    runInAction(() => {
      this.me = null;
    });
  }
}
