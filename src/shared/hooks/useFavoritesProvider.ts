import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../db/config';
import { IUser } from '../model/User';

const useFavoritesProvider = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites();
      } else {
        setFavorites([]);
      }
    });

    return () => unsub();
  }, []);

  const getUserFavorites = async () => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as IUser;
      setFavorites(data.favorites || []);
    } catch (error) { }
  };

  const addToFavorites = async (docID: string) => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(docID)
      });
      setFavorites((prevState) => [...prevState, docID]);
    } catch (error) { }
  };

  const removeFromFavorites = async (docID: string) => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayRemove(docID)
      });
      const newFavorites = favorites.filter((favorite) => favorite !== docID);
      setFavorites(newFavorites);
    } catch (error) { }
  };

  const checkFavorite = (docID: string) => favorites.includes(docID);

  return { favorites, setFavorites, getUserFavorites, checkFavorite, removeFromFavorites, addToFavorites }

};

export default useFavoritesProvider