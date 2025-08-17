'use client'

import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";

export default function NewsSlider({ data, height }) {

    return (
        <>
            <style jsx global>{`
      .swiper-pagination-bullet {
        background-color: rgba(255, 255, 255, 0.4); /* دایره‌های غیر فعال */
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background-color: white; /* دایره فعال */
      }
    `}</style>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}
                        className='px-1'
                    >
                        <div style={{ height: `250px` }} className="w-full overflow-hidden rounded-lg relative ">
                            <Image
                                fill
                                className="object-cover rounded-b-lg"
                                src={`${item.image_path ? item.image_path.includes("http") ? item.image_path : `${process.env.NEXT_PUBLIC_BASE_IMAGE}${item.image_path}` : item.image.includes("http") ? item.image : `${process.env.NEXT_PUBLIC_BASE_IMAGE}${item.image}`}`}
                                alt={`slider-${index}`}
                            />
                            <div className='absolute bottom-0 w-full h-24 min-h-fit text-base px-2 font-bold backdrop-brightness-50 text-white'>
                                <p>{item.name ? item.name : item.title}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}