import { useState, useEffect, useRef, Fragment } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../../shared/db/config';
import ListingItem from '../../components/ListingItem';
import ListingItemSkeleton from '../../skeletons/ListingItemSkeleton';
import { IProperty } from '../../shared/model/Property';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import { useAppContext } from '../../shared/context/Context';


function MyListings() {
  const initalRender = useRef(true);
  const { api } = useAppContext()
  const [listings, setListings] = useState<IProperty[]>([]);
  const [item, setItem] = useState<IProperty>()
  const [filteredListings, setFilteredListings] = useState<IProperty[]>([]);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [listingTypeOption, setListingTypeOption] = useState('all');

  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'products'), where('uid', '==', auth.currentUser?.uid))
  );

  useEffect(() => {
    document.title = 'My Listings | Rent or Sell';
  }, []);

  useEffect(() => {
    if (snapshot) {
      const listingsData: IProperty[] = [];
      snapshot.forEach((doc) => {
        return listingsData.push({
          id: doc.id,
          ...doc.data()
        } as IProperty);
      });
      setListings(listingsData);
      setFilteredListings(listingsData);
    }
  }, [snapshot]);

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
  }, [listingTypeOption]);

  const deleteListing = async (docID: string) => {
    try {
      await deleteDoc(doc(db, 'listings', docID));
      const newFilteredListings = filteredListings.filter((listing) => listing.id !== docID);
      setFilteredListings(newFilteredListings);
      const newListings = listings.filter((listing) => listing.id !== docID);
      setListings(newListings);
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error("error");
    }
  };

  const showConfirmationModal = () => {
    setisConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setisConfirmationModalOpen(false);
  };

  const onSelectDelete = async (item: IProperty) => {
    await api.property.delete(item)
    hideConfirmationModal();
  };

  const onConfirm = async () => {
    // await api.property.delete(item)
    hideConfirmationModal();
  };

  return (
    <Fragment>
      <main className="min-h-screen max-w-7xl px-3 mx-auto">
        <section className="lg:py-24 md:py-20 py-14">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">My Listings</h1>
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
            {loading && Array(2).fill(2).map(() => <ListingItemSkeleton key={Math.random()} />)}
            {error && <p className="xl:col-span-3 md:col-span-2">{error.message}</p>}
            {filteredListings.length === 0 && !error ? (<p className="xl:col-span-3 md:col-span-2">No listings to show.</p>) : null}
            {filteredListings.length > 0 && filteredListings.map((item) => (
              <ListingItem key={item.id} item={item} showDeleteModal={showConfirmationModal} />
            ))}
          </div>
        </section>
      </main>
      <DeleteConfirmationModal
        message="Are you sure you want to delete this listing?"
        showModal={isConfirmationModalOpen}
        hideModal={hideConfirmationModal}
        onConfirm={onConfirm}
      />
    </Fragment>
  );
}

export default MyListings;
