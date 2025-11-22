'use client'

import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BrandProducts({ locale, slug }) {

    const [data, setData] = useState(null)

    const fetchProducts = async () => {
        const res = await api.get(`application/brand-products?slug=${slug}&per_page=10`).catch(err => servError())
        if (res.error || (res.status == 200 && res.data.flag == false)) {
            setData({ error: true })
            return
        }

        if (res.status == 200 && res.data.flag == true) {

            setData(res.data.response)
        }
    }

    useEffect(() => {

        fetchProducts()

    }, [])


    return (
        <div className="w-full overflow-auto ">
            <div className="flex flex-row  flex-nowrap w-fit gap-2 px-1 ">
                {data && data.products.map((i) => (
                    <Link
                        href={`/${locale}/Products/${i.slug}`}
                        key={i.id}
                        className="bg-white flex flex-col rounded-md overflow-hidden w-40 h-36"
                    >
                        <div className="flex-grow relative">
                            <Image quality={100}
                                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image}`}
                                alt="product"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-nowrap truncate text-sm py-2 px-2 font-bold">{i.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}