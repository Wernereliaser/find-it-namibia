import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingItemSkeleton from '../../skeletons/ListingItemSkeleton';
import { IProperty } from '../../shared/model/Property';
import ListingItem from '../../components/ListingItem';
import { useAppContext } from '../../shared/context/Context';
import { observer } from 'mobx-react-lite';
import EmptyMessage from '../../components/EmptyError';

const CategoryView = observer(() => {

  const { api } = useAppContext()
  const [sortBy, setSortBy] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { categoryName = 'categoryName' } = useParams<{ categoryName: string }>();
  const [data, setData] = useState<IProperty[]>([]);

  const [loading, setLoading] = useState(true);
  const pageTitle = categoryName === 'sale' ? '| Sale' : '| Rent';

  useEffect(() => {
    setLoading(true)
    try {
      if (sortBy) {
        const filteredList = async () => {
          const data = await api.property.getFilteredCategory(categoryName, sortBy);
          setData(data as IProperty[]);
        };
        filteredList();
      } else {
        const categoryList = async () => {
          const data = await api.property.getByCategory(categoryName);
          setData(data as IProperty[]);
        };
        categoryList()
      }
    } catch (error) {
      setErrorMessage(`${error}`)
    }
    setLoading(false)
  }, [categoryName, sortBy, api.property]);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="sm:flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center sm:mb-0 mb-5">
            {pageTitle}
          </h1>
          <div className="flex items-center justify-start gap-5 flex-1 max-w-sm sm:mx-0 mx-auto">
            <label htmlFor="sortby" className="label flex-shrink-0 text-sm">
              Sort by
            </label>
            <select
              name="sortby"
              id="sortby"
              className="select select-bordered flex-1 font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Default</option>
              <option value="price-asc">Price : Low to High</option>
              <option value="price-desc">Price : High to Low</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="carspace">Car space</option>
              <option value="listingSize">Area</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {loading && Array(3).fill(3).map(() => (<ListingItemSkeleton key={Math.random()} />))}

          {!loading && data.map((item, index) => (<ListingItem key={index} item={item} />))}

          {!loading && errorMessage && (<EmptyMessage />)}

        </div>
      </section>
    </main>
  );
})

export default CategoryView;
