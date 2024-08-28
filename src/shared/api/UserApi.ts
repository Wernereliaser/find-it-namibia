import {
  query,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { Unsubscribe } from "firebase/firestore";
import AppApi from "./AppApi";
import { IUser } from "../model/User";
import AppStore from "../store/AppStore";
import { db } from "../db/config";

export default class UserApi {

  constructor(private api: AppApi, private store: AppStore) { }

  private path() {
    return "users";
  }

  async getAll() {
    const $query = query(collection(db, this.path()));
    return await new Promise<Unsubscribe>((resolve, reject) => {
      const unsubscribe = onSnapshot($query, (querySnapshot) => {
        const items: IUser[] = [];
        querySnapshot.forEach((doc) => {
          const user = { uid: doc.id, ...doc.data() } as IUser;
          items.push(user);
        });
        this.store.user.load(items);
        resolve(unsubscribe);
      }, (error) => { reject(); });
    });
  }


  async getByUid(id: string) {
    const unsubscribe = onSnapshot(doc(db, this.path(), id), (doc) => {
      if (!doc.exists) return;
      const item = { uid: doc.id, ...doc.data() } as IUser;
      this.store.user.load([item]);
    });
    return unsubscribe;
  }

  async create(item: IUser) {
    try {
      await setDoc(doc(collection(db, this.path()), item.uid), item, {
        merge: true,
      });
      this.store.user.load([item]);
    } catch (error) { }
  }


  async update(item: IUser) {
    try {
      await updateDoc(doc(db, this.path(), item.uid), {
        ...item,
      });
      this.store.user.load([item]);
    } catch (error) { }
  }

  async delete(item: IUser) {
    try {
      await deleteDoc(doc(db, this.path(), item.uid));
      this.store.user.remove(item.uid);
    } catch (error) {
      console.log(error);
    }
  }
}
