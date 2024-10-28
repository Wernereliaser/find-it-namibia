import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface IProps {
  imgUrls: string[];
  title: string
}

function ListingGallery({ imgUrls, title }: IProps) {
  return (
    <Swiper
      autoHeight={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="listing-gallery-carousel">
      {imgUrls.map((imageURL, index) => (
        <SwiperSlide key={index}>
          <img src={imageURL} className="w-full" alt={`${title} of ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ListingGallery;
