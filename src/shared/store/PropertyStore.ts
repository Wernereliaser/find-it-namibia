
import { runInAction } from "mobx";
import AppStore from "./AppStore";
import Store from "./Store";
import { IProperty, Property } from "../model/Property";

export default class PropertyStore extends Store<IProperty, Property> {
  items = new Map<string, Property>();

  constructor(store: AppStore) {
    super(store);
    this.store = store;
  }

  load(items: IProperty[]) {
    runInAction(() => {
      items.forEach((item) =>
        this.items.set(item.id, new Property(this.store, item))
      );
    });
  }
}
