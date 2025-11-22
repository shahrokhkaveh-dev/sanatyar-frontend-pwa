'use client'

import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import Link from 'next/link';

export default function Slider({ data, height, locale }) {

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
                className="w-full h-full "
            >
                {data.map((item, index) => (
                    <SwiperSlide className='w-full  relative aspect-[3/2] grid grid-c' key={index}>
                        <Link aria-checked={!item.slug} href={item.slug ? `/${locale}/${item.type.includes("brand") ? `Brand/${item.slug}` : `Products/${item.slug}`}` : "/"} className="w-full   h-full aria-checked:pointer-events-none">
                            <Image quality={100}
                                fill
                                className="object-cover"
                                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${item.image_url}`}
                                alt={`slider-${index}`}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}