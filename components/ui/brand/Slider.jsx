'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

export default function BrandSlider({ data, height = 300 }) {

    return (
        <div className="relative w-full" style={{ height }}>
            <style jsx global>{`
        .swiper-pagination-bullets {
          position: absolute;
          bottom: 0 !important;
          left: 0;
          width: 100%;
          z-index: 30;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: brightness(60%);
          height: 56px;
          padding-bottom: 8px;
        }

        .swiper-pagination-bullet {
          background-color: white !important;
          opacity: 1 !important;
          margin: 0 4px;
        }

        .swiper-pagination-bullet-active {
          background-color: white !important;
        }
      `}</style>

            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${item.image_path}`}
                                alt={`slide-${index}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
