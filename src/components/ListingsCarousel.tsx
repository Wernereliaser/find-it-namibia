
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';
import { IProperty } from '../shared/model/Property';
import ListingItem from './ListingItem';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface IProps {
  listings: IProperty[];
  loading: boolean;
}

function ListingsCarousel({ listings, loading }: IProps) {

  const rest = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 2
      }
    }
  };

  return (
    <Swiper {...rest}
      autoHeight={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {loading &&
        listings.map((item) => (
          <SwiperSlide key={item.id} className="px-1 py-4">
            <ListingItemSkeleton />
          </SwiperSlide>
        ))}
      {!loading &&
        listings.map((item) => (
          <SwiperSlide key={item.id} className="px-1 py-4">
            <ListingItem item={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default ListingsCarousel;


