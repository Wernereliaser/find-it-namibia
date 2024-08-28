import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDc3RBcNEkLH59orv9iZRX2l9vSKIl4Usg",
  authDomain: "find-it-namibia.firebaseapp.com",
  projectId: "find-it-namibia",
  storageBucket: "find-it-namibia.appspot.com",
  messagingSenderId: "234023637323",
  appId: "1:234023637323:web:7f2e242490e929504ed8ce",
  measurementId: "G-3HT3WZP9KF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

