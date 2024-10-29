import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as BedroomIcon } from '../assets/svg/bed.svg';
import { ReactComponent as BathroomIcon } from '../assets/svg/bathtub.svg';
import { ReactComponent as CarIcon } from '../assets/svg/car.svg';
import { ReactComponent as RulerIcon } from '../assets/svg/ruler.svg';
import { ReactComponent as TrashIcon } from '../assets/svg/trash.svg';
import { ReactComponent as EditIcon } from '../assets/svg/pen.svg';
import { formatPrice } from '../shared/utils/utils';
import { IProperty } from '../shared/model/Property';
import SaveButton from './SaveButton';
import { useAppContext } from '../shared/context/Context';
import useFavoritesProvider from '../shared/hooks/useFavoritesProvider';
import { Fragment } from 'react';

interface IProps {
  item: IProperty;
  showDeleteModal?: (item: IProperty) => void
}

function ListingItem({ item, showDeleteModal }: IProps) {

  const { store } = useAppContext();

  const { address, bathrooms, bedrooms, carspace, id, images, listingSize, regularPrice, title, type } = item
  const listingType = type === 'sale' ? 'For Sale' : 'For Rent';
  const listingPrice = `${formatPrice(regularPrice)} ${type === 'rent' ? '/month' : ''}`;

  const { checkFavorite } = useFavoritesProvider();
  const isFavorite = checkFavorite(item.id);
  const navigate = useNavigate()

  const onEdit = () => {
    store.property.select(item)
    navigate(`/user/edit/${id}`)
  };

  return (
    <Fragment>
      <article className="card shadow-md card-bordered border-gray-200 relative">
        <div className="absolute flex items-center top-0 left-0 w-full p-4 gap-2">
          <span className={`listing-type ${type}`}>{listingType}</span>
          <span className="listing-type bg-primary ml-auto">{listingPrice}</span>
        </div>
        <figure className="h-72 w-full">
          <img src={images[0]} alt={title} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body text-center p-4 md:p-8">
          <p className="text-sm mb-3">{address}</p>
          <h2 className="card-title text-gray-900">{title}</h2>
          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 font-bold text-[0.75rem] text-gray-900">
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <BedroomIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              {bedrooms}
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <BathroomIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              {bathrooms}
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <CarIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              {carspace}
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <RulerIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              {listingSize} SQFT
            </span>
          </div>
          <div className="card-actions">
            <div className="flex gap-2 w-full">
              <Link className="btn btn-primary btn-block mx-0 flex-1" to={`/view/${id}`}>
                More info
              </Link>
              <SaveButton docID={id} isFavorite={isFavorite} />
            </div>
            {showDeleteModal ? (
              <div className="grid grid-cols-2 gap-2 flex-grow">
                <button
                  aria-label="Edit listing"
                  className="btn btn-secondary btn-block mx-0"
                  onClick={onEdit}>
                  <EditIcon className="w-6 h-6 text-white" />
                </button>
                <button
                  aria-label="Delete listing"
                  className="btn btn-accent btn-block mx-0"
                  type="button"
                  onClick={() => showDeleteModal(item)}>
                  <TrashIcon className="w-7 h-7 text-white" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Fragment>
  );
}

export default ListingItem;
