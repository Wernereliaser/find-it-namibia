import { formatPrice } from "../../shared/utils/utils";

interface IProps {
  regularPrice: number;
  type: string
}

function ListingPrice({ regularPrice, type }: IProps) {
  return (
    <p className="font-bold text-gray-900 text-[2.2rem] md:text-[2.5rem] pb-6 mb-6 border-b border-b-gray-300">
      {formatPrice(regularPrice)}
      {type === 'rent' ? '/month' : null}
    </p>
  );
}

export default ListingPrice;

