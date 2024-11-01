import {
  query,
  collection,
  updateDoc,
  doc,
  where,
  arrayUnion,
  deleteDoc,
  onSnapshot,
  setDoc,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import AppApi from "./AppApi";
import AppStore from "../store/AppStore";
import { IProperty } from "../model/Property";
import { db, storage } from "../db/config";
import { IMessage } from "../../pages/messages/Messages";
export default class PropertyApi {
  constructor(private api: AppApi, private store: AppStore) { }

  private path() {
    return "products";
  }

  async getAll() {
    try {
      const q = query(collection(db, this.path()));
      const querySnapshot = await getDocs(q);
      const data: IProperty[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        } as IProperty);
      });
      this.store.property.load(data);
    } catch (error) {
      console.log(error);
    }
  };

  async getFilteredCategory(categoryName: string, sortBy: string) {
    try {
      const listingsRef = collection(db, this.path());
      let q;
      if (sortBy === 'price-asc') {
        q = query(listingsRef, where('type', '==', categoryName), orderBy('regularPrice', 'asc'));
      } else if (sortBy === 'price-desc') {
        q = query(listingsRef, where('type', '==', categoryName), orderBy('regularPrice', 'desc'));
      } else {
        q = query(listingsRef, where('type', '==', categoryName), orderBy(sortBy, 'desc'));
      }
      const querySnapshot = await getDocs(q);
      const data: IProperty[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        } as IProperty);
      });
      return data
    } catch (error) {
      console.log(error);
    }
  };

  async getByCategory(categoryName: string) {
    try {
      const q = query(collection(db, this.path()), where('type', '==', categoryName));
      const querySnapshot = await getDocs(q);
      const data: IProperty[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        } as IProperty);
      });
      return data
    } catch (error) {
      console.log(error);
    }
  };

  async getById(id: string) {
    const path = this.path();
    if (!path) return;

    const unsubscribe = onSnapshot(doc(db, path, id), (doc) => {
      if (!doc.exists) return;
      const item = {
        id: doc.id,
        ...doc.data()
      } as IProperty;
      this.store.property.load([item]);
    });

    return unsubscribe;
  }

  async create(item: IProperty) {
    const itemRef = doc(collection(db, this.path()));
    item.id = itemRef.id;

    try {
      await setDoc(itemRef, item, { merge: true });
      this.store.property.load([item]);
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(item: IMessage) {

    const messagesRef = collection(db, 'messages');
    item.id = messagesRef.id;

    try {
      await addDoc(messagesRef, item);
    } catch (error) {
      console.log(error);
    }
  }

  async update(item: IProperty) {
    try {
      await updateDoc(doc(db, this.path(), item.id), { ...item });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(item: IProperty) {
    const path = this.path();
    if (!path) return;

    try {
      await deleteDoc(doc(db, path, item.id));
      item.images.forEach(async (image) =>
        await this.deleteFromStorage(image)
      )

      this.store.property.remove(item.id);
    } catch (error) { }
  }

  async attachImages(
    item: IProperty,
    value: { name: string; link: string }
  ) {
    const path = this.path();
    const me = this.store.auth.meJson;
    if (!path || !me) return;

    const taskRef = doc(db, path, item.id);

    await updateDoc(taskRef, {
      images: arrayUnion(value),
    });
  }

  async deleteFromStorage(fileUrl: string) {
    const imageRef = ref(storage, fileUrl);
    await deleteObject(imageRef).then(() => { }).catch((error) => {
      console.log(error);
    });
  }
}
