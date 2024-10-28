import { useState, useEffect } from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { IProperty } from '../../shared/model/Property';
import { db } from '../../shared/db/config';
import ListingsCarousel from '../../components/ListingsCarousel';
import EmptyMessage from '../../components/EmptyError';
import { Link } from 'react-router-dom';

function ForSaleSection() {

  const [listings, setListings] = useState<IProperty[]>([]);

  const [snapshot, loading, error] = useCollectionOnce(
    query(collection(db, 'products'),
      where('type', '==', 'sale'),
      orderBy('postedOn', 'desc'),
      limit(4)
    )
  );

  useEffect(() => {
    if (snapshot) {
      const data: IProperty[] = [];
      snapshot.forEach((doc) => {
        return data.push({
          id: doc.id,
          ...doc.data()
        } as IProperty);
      });
      setListings(data);
    }
  }, [snapshot]);

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-4 xl:items-center">
      <div className="col-span-4 xl:pr-16 text-center xl:text-left">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">For Sale</h2>
        <p className="text-gray-600 leading-loose xl:mb-12 mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi officia expedita et non
          vero quos.
        </p>
        <Link to="/category/sale" className="btn btn-primary w-40 mb-8 xl:mb-0">
          View all
        </Link>
      </div>
      <div className="col-span-8">
        {loading ? (
          <ListingsCarousel loading={loading} listings={Array(2).fill(2)} />
        ) : error ? (
          <p className="xl:col-span-3 md:col-span-2">{error.message}</p>
        ) : listings.length ? (
          <ListingsCarousel loading={loading} listings={listings} />
        ) : (
          <EmptyMessage />
        )}
      </div>
    </div>
  );
}

export default ForSaleSection;
