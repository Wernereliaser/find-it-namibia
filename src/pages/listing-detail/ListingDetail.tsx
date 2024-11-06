import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import ListingInfoCard from './ListingInfoCard';
import ListingGallery from './ListingGallery';
import { ReactComponent as MailIcon } from '../../assets/svg/mail.svg';
import ListingDetailsSkeleton from '../../skeletons/ListingDetailsSkeleton';
import { auth, db } from '../../shared/db/config';
import { defaultProperty, IProperty } from '../../shared/model/Property';
import SaveButton from '../../components/SaveButton';
import useFavoritesProvider from '../../shared/hooks/useFavoritesProvider';
import ContactOwnerModal from '../../components/ContactOwnerModal';

function ListingDetail() {

  const [listing, setListing] = useState<IProperty>({ ...defaultProperty });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { listingId = 'listingId' } = useParams<{ listingId: string }>();
  const { checkFavorite } = useFavoritesProvider();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const getListingData = async () => {
      if (listingId) {
        try {
          const docRef = doc(db, 'products', listingId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setListing(docSnap.data() as IProperty);
            setLoading(false);
          } else {
            throw new Error('Listing does not exist.');
          }
        } catch (error) {
          setError(`${error}`);
          setLoading(false);
        }
      } else {
        console.log("Listing does not exist.");
      }
    }
    getListingData();
  }, [listingId]);

  const { address, description, images, postedOn, title } = listing;

  if (loading) {
    return <ListingDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14 text-center">
        <p>Listing does not exist.</p>
      </div>
    );
  }

  return (
    <Fragment>
      <main>
        <div className="w-full h-[32rem] md:h-[35rem] lg:h-[40rem] bg-black">
          <img alt="" src={images[0]} className="w-full h-full object-cover opacity-70" />
        </div>
        <article className="min-h-screen max-w-7xl px-3 mx-auto lg:py-24 md:py-20 py-14">
          <section className="lg:grid lg:grid-cols-[1fr_448px] lg:gap-9 lg:items-start">
            <div className="bg-white card card-bordered border-gray-300 max-w-md mb-8 lg:mb-0 -mt-40 md:-mt-48 lg:order-2">
              <div className="card-body relative">
                <ListingInfoCard item={listing} />
              </div>
            </div>
            <div className="lg:order-1">
              {auth.currentUser && auth.currentUser.uid !== listing.uid ? (
                <SaveButton isFavorite={checkFavorite(listingId)} docID={listingId} />
              ) : null}
              {auth.currentUser && auth.currentUser.uid !== listing.uid ? (
                <button
                  type="button"
                  className="btn btn-accent ml-2"
                  aria-label="Contact owner"
                  onClick={() => setIsContactModalOpen(true)}>
                  <MailIcon className="w-6 h-6" />
                </button>
              ) : null}
              <span className="block text-sm text-gray-500 mb-3 mt-4">
                Posted on : {new Date(postedOn).toLocaleString()}
              </span>
              <h1 className="text-gray-900 font-extrabold text-3xl mb-4">{title}</h1>
              <address className="not-italic text-lg text-gray-900 mb-3">{address}</address>
              <p className="text-gray-600 leading-loose">{description}</p>
            </div>
          </section>
          <section className="lg:pt-24 md:pt-20 pt-14">
            <h2 className="text-gray-900 font-extrabold text-3xl mb-4">Gallery</h2>
            <ListingGallery imgUrls={images} title={title} />
          </section>
        </article>
      </main>
      <ContactOwnerModal
        showModal={isContactModalOpen}
        hideModal={() => setIsContactModalOpen(false)}
        docID={listingId}
        userRef={listing.uid}
        listingTitle={listing.title}
      />
    </Fragment>
  );
}

export default ListingDetail;
