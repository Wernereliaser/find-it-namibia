import AppApi from "./AppApi";
import {
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AppStore from "../store/AppStore";
import { auth, db } from "../db/config";
import { IUser } from "../model/User";

export default class AuthApi {

  constructor(private api: AppApi, private store: AppStore) {
    this.handleAuthStateChange();
  }

  private handleAuthStateChange() {
    onAuthStateChanged(auth, async (user) => {
      this.store.auth.setLoading(true);
      if (!user) {
        this.logout();
        this.store.auth.setLoading(false);
        return;
      }
      try {
        this.handleUserBasicInfo(user.uid);
      } catch (error) {
        this.logout();
      }
    });
  }

  private path() {
    return "users";
  }

  private async handleUserBasicInfo(uid: string) {
    try {
      const $doc = await getDoc(doc(db, this.path(), uid));
      const data = { uid: $doc.id, ...$doc.data() } as IUser;
      this.store.auth.login(data);
      this.store.auth.setLoading(false);
    } catch (error) { }
  }

  async register(item: IUser) {
    const password = "find-it-namibia";

    await createUserWithEmailAndPassword(auth, item.email, password).then(async (userCredential) => {
      if (userCredential) {
        if (userCredential) {
          item.uid = userCredential.user.uid;
          item.password = "";
          await setDoc(doc(db, this.path(), item.uid), item);
          this.store.user.load([item])
          this.sendEmail(item.email);
          this.logout();
        }
      }
    }).catch((error) => {
      window.alert("email-already-in-use");
    });
  }

  async sendEmail(email: string) {
    await sendPasswordResetEmail(auth, email).then(function () {
      window.alert("Password reset email sent to user");
    }).catch(function (error) {
      window.alert("Could not send Password reset email sent to user");
    });
  }

  async login(email: string, password: string) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // async login(email: string, password: string) {
  //   setPersistence(auth, browserLocalPersistence).then(() => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   }).catch((error) => {
  //     console.log(error);
  //     return null;
  //   });

  //   const credential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
  //     console.log(error);
  //     return null;
  //   });

  //   if (credential) return credential.user;
  //   return credential;
  // }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) { }
    this.store.auth.logout();
  }
}
