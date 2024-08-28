import {
  query,
  collection,
  updateDoc,
  doc,
  where,
  arrayUnion,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
  setDoc,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AppApi from "./AppApi";
import AppStore from "../store/AppStore";
import { IProperty } from "../model/Property";
import { db, storage } from "../db/config";

export default class PropertyApi {
  constructor(private api: AppApi, private store: AppStore) { }

  private path() {
    return "properties";
  }

  async getAll() {
    this.store.property.removeAll();
    const path = this.path();
    if (!path) return;

    // const $query = query(collection(db, path), orderBy("datePosted", "desc"));
    const $query = query(collection(db, path));

    return await new Promise<Unsubscribe>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        $query,
        (querySnapshot) => {
          const documents: IProperty[] = [];
          querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() } as IProperty);
          });
          this.store.property.load(documents);
          resolve(unsubscribe);
        },
        (error) => {
          reject();
        }
      );
    });
  }

  async getByDate(limitValue: number) {
    let lastDocument = null;
    const path = this.path();
    if (!path) return;
    const collectionRef = collection(db, path);
    let q = query(
      collectionRef,
      orderBy("datePosted", "desc"),
      limit(limitValue)
    );

    if (lastDocument) {
      q = query(
        collectionRef,
        orderBy("dateField", "desc"),
        limit(limitValue),
        startAfter(lastDocument)
      );
    }

    try {
      const querySnapshot = await getDocs(q);
      const documents: IProperty[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() } as IProperty);
      });
      if (querySnapshot.docs.length > 0) {
        lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
      }
      this.store.property.load(documents);
    } catch (error) {
      throw error;
    }
  }

  async getByUID(uid: string) {
    // get the db path
    const path = this.path();
    if (!path) return;

    // remove all items from store
    this.store.property.removeAll();

    // create the query
    const $query = query(collection(db, path), where("postedById", "==", uid));

    // new promise
    return await new Promise<Unsubscribe>((resolve, reject) => {
      // on snapshot
      const unsubscribe = onSnapshot(
        $query,
        // onNext
        (querySnapshot) => {
          const items: IProperty[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as IProperty);
          });

          this.store.property.load(items);
          resolve(unsubscribe);
        },
        // onError
        (error) => {
          reject();
        }
      );
    });
  }

  async getByCategory(category: string) {
    this.store.property.removeAll();
    const path = this.path();
    if (!path) return;

    const $query = query(
      collection(db, path),
      where("category", "==", category)
    );

    const unsubscribe = onSnapshot($query, (querySnapshot) => {
      const foods: IProperty[] = [];
      querySnapshot.forEach((doc) => {
        foods.push({ id: doc.id, ...doc.data() } as IProperty);
      });
      this.store.property.load(foods);
    });
    return unsubscribe;
  }

  async getById(id: string) {
    const path = this.path();
    if (!path) return;

    const unsubscribe = onSnapshot(doc(db, path, id), (doc) => {
      if (!doc.exists) return;
      const item = { id: doc.id, ...doc.data() } as IProperty;
      this.store.property.load([item]);
    });

    return unsubscribe;
  }

  async create(item: IProperty) {
    const path = this.path();
    if (!path) return;

    const itemRef = doc(collection(db, path));
    item.id = itemRef.id;

    try {
      await setDoc(itemRef, item, { merge: true });
      this.store.property.load([item]);
    } catch (error) { }
  }

  async update(item: IProperty) {
    const path = this.path();
    if (!path) return;

    try {
      await updateDoc(doc(db, path, item.id), { ...item });
    } catch (error) { }
  }

  async delete(item: IProperty) {
    const path = this.path();
    if (!path) return;

    try {
      await deleteDoc(doc(db, path, item.id));
      item.images.forEach(async (image) =>
        await this.deleteImage(image)
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

  async uploadItemImage(item: IProperty, file: File) {
    const filePath = `/mekato/${file.name}`;
    const uploadTask = uploadBytesResumable(ref(storage, filePath), file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const value = { name: file.name, link: downloadURL };
          this.attachImages(item, value);
        });
      }
    );
  };

  async deleteImage(imageUrl: string) {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef).then(() => { }).catch((error) => { });
  }
}
