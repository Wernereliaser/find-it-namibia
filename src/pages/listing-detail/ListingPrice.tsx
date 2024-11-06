import { formatPrice } from "../../shared/utils/utils";

interface IProps {
  regularPrice: number;
  type: string
}

function ListingPrice({ regularPrice, type }: IProps) {
  return (
    <p className="text-gray-900 font-extrabold text-3xl mb-4">
      {formatPrice(regularPrice)}
      {type === 'rent' ? '/month' : null}
    </p>
  );
}

export default ListingPrice;

