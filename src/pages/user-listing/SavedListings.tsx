import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import useFavoritesProvider from '../../shared/hooks/useFavoritesProvider';
import { db } from '../../shared/db/config';
import { IProperty } from '../../shared/model/Property';
import ListingItemSkeleton from '../../skeletons/ListingItemSkeleton';
import ListingItem from '../../components/ListingItem';


function SavedListings() {
  const initalRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<IProperty[]>([]);
  const [filteredListings, setFilteredListings] = useState<IProperty[]>([]);
  const [error, setError] = useState('');
  const [listingTypeOption, setListingTypeOption] = useState('all');

  const { favorites } = useFavoritesProvider();

  useEffect(() => {
    document.title = 'Saved Listings | Rent or Sell';
  }, []);


  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const savedListingDocs = await Promise.all(
          favorites.map((docID) => getDoc(doc(db, 'products', docID)))
        );

        const list = savedListingDocs.map((docSnap) => ({
          ...(docSnap.data() as IProperty),
        }));

        setListings(list);
        setFilteredListings(list)
      } catch (error) {
        setError("error");
      }
    };

    if (favorites.length) {
      setLoading(true)
      fetchSavedListings();
      setLoading(false)
    }
  }, [favorites]);

  useEffect(() => {
    if (!initalRender.current) {
      if (listingTypeOption === 'all') {
        setFilteredListings(listings);
      } else {
        const filterResults = listings.filter((listing) => listing.type === listingTypeOption);
        setFilteredListings(filterResults);
      }
    } else {
      initalRender.current = false;
    }
  }, [listingTypeOption, listings]);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Saved Listings</h1>
          <select
            className="select select-bordered w-full max-w-xs mb-8 mx-auto md:mx-0 block"
            value={listingTypeOption}
            onChange={(e) => setListingTypeOption(e.target.value)}>
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array(2).fill(2).map(() => <ListingItemSkeleton key={Math.random()} />)}
          {error && <p className="xl:col-span-3 md:col-span-2">{error}</p>}
          {filteredListings.length === 0 && !error ? (
            <p className="xl:col-span-3 md:col-span-2">No listings to show.</p>
          ) : null}
          {filteredListings.length > 0 &&
            filteredListings.map((item) => (
              <ListingItem key={item.id} item={item} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default SavedListings;
