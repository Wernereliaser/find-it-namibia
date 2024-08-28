import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { IProperty } from '../../shared/model/Property';
import { db } from '../../shared/db/config';

export const getListingsByCategory = async (categoryName: string) => {
  if (categoryName !== 'sale' && categoryName !== 'rent') {
    return [[], 'Invalid category'];
  }
  try {
    const q = query(collection(db, 'listings'), where('type', '==', categoryName));
    const querySnapshot = await getDocs(q);
    const data: IProperty[] = [];
    querySnapshot.forEach((doc) => {
      return data.push({
        id: doc.id,
        ...doc.data()
      } as IProperty);
    });
    return data.length ? [data, null] : [[], 'No listings found'];
  } catch (error) {
    return [[], error];
  }
};

export const getFilteredListings = async (categoryName: string, sortBy: string) => {
  if (categoryName !== 'sale' && categoryName !== 'rent') {
    return [[], 'Invalid category'];
  }
  try {
    const listingsRef = collection(db, 'listings');
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
      return data.push({
        id: doc.id,
        ...doc.data()
      } as IProperty);
    });
    return data.length ? [data, null] : [[], 'No listings found'];
  } catch (error) {
    return [[], error];
  }
};
