
import { runInAction } from "mobx";
import AppStore from "./AppStore";
import { IUser, UserModel } from "../model/User";
import Store from "./Store";

export default class UserStore extends Store<IUser, UserModel> {
  items = new Map<string, UserModel>();

  constructor(store: AppStore) {
    super(store);
    this.store = store;
  }

  load(items: IUser[]) {
    runInAction(() => {
      items.forEach((item) =>
        this.items.set(item.uid, new UserModel(this.store, item))
      );
    });
  }
}
