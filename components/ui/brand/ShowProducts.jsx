'use client'

import HeaderItems from "@/components/layout/HeaderItems";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ShowProducts({ locale, t, slug, brand }) {

    const bottomRef = useRef(null)

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        setLoading(true)
        const res = await api.get(`application/brand-products?slug=${slug}&per_page=10&page=${page}`).catch(err => servError(err)).finally(() => setLoading(false))
        if (res.status == 200 && res.data.flag == false) {
            setData(null)
            return
        }
        if (res.status == 200 && res.data.flag == true) {

            setData(res.data.response)
            setProducts((prev) => ([...prev, ...res.data.response.products]))
        }
    }

    useEffect(() => {

        fetchProducts()
    }, [page])
    useEffect(() => {
        if (!bottomRef.current || !data) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    if (data.current_page < data.last_page) {
                        setPage(() => data.current_page + 1)
                    }

                }
            },
            {
                root: null, // یعنی viewport
                rootMargin: "0px",
                threshold: 0.1, // وقتی 10٪ از تگ دیده شد
            }
        );

        observer.observe(bottomRef.current);

        return () => observer.disconnect();
    }, [bottomRef, show]);
    console.log(page)
    return (
        <div onClick={() => setShow(true)} className="w-full  h-16 rounded-md border-[1px] border-blue-900 bg-white flex flex-col justify-around py-1 items-center justify-self-start ">

            {!loading && data ? <p>{data.total}</p> : <div className="loader"></div>}
            <p>{t.products}</p>

            {show && <div onClick={(e) => e.stopPropagation()} style={{ zIndex: 999 }} className=" absolute top-0 right-0 w-full h-full bg-neutral-100 overflow-y-auto">
                <HeaderItems title={brand.name} action={() => setShow(false)} />
                <div className="grid grid-cols-2 gap-3 justify-items-center px-2 my-2">
                    {data !== null ? products.map((i) => (
                        <Link

                            href={`/${locale}/Products/${i.slug}`}
                            key={i.id}
                            className="bg-white flex flex-col rounded-md overflow-hidden w-full  h-36"
                        >
                            <div className="flex-grow relative">
                                <Image quality={100}
                                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image}`}
                                    alt="product"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-nowrap text-center truncate text-sm py-2 px-2 font-bold">{i.name}</p>
                        </Link>
                    )) :
                        <>
                            {loading ?
                                <div className="loader2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div> :
                                <div className="flex flex-col items-center justify-center w-full col-span-full" >
                                    <p>خطا در بارگذاری اطلاعات</p>
                                    <button onClick={() => fetchProducts()} className="px-6 py-1.5 mt-2.5 bg-blue-900 text-white rounded-lg">تلاش مجدد</button>
                                </div>
                            }
                        </>
                    }
                    {data.total > 10 && data.current_page < data.last_page && < div ref={bottomRef} className="h-6" />}
                </div>

            </div>
            }

        </div>
    );
}