'use client';

import Link from "next/link";
import Filter from "../ui/Filter";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "../modals/Loading";

export default function Products({ data, Fainal, locale, t, total }) {

    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false)
        } else if (Fainal && Fainal !== true) {
            setLoading(true)
        }
        setProducts((perv) => {
            if (searchParams.get("page") && searchParams.get("page") > 1) {
                return [...perv, ...data];
            } else {
                return data;
            }
        })
    }, [data])

    const bottomRef = useRef(null);
    const page = searchParams.get("page") || 1;
    const params = new URLSearchParams(searchParams.toString());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && Products.length > 0 && Fainal == false) {
                    params.set("page", parseInt(page) + 1);
                    router.push(`?${params.toString()}`, { scroll: false });
                    setLoading(true)
                }
            },
            {
                rootMargin: "100px",
            }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [Products, Fainal, page, searchParams]);

    return (
        <div className="flex flex-col gap-y-2.5 min-h-screen">
            {loading && <Loading />}
            <Filter total={total} setBrands={setProducts} locale={locale} t={t} />
            <div className="grid grid-cols-2 gap-2.5 px-3">
                {data.length === 0 && !loading && (
                    <div className="col-span-2 text-center text-gray-500">
                        {t.no_products_found}
                    </div>
                )}

                {Products.length > 0 && Products.map((i, index) => (
                    <Link href={`/${locale}/Products/${i.slug}`} key={i.slug || index} className="bg-white rounded-md p-1 ">
                        <Image quality={100} className="w-full h-36 object-contain" alt={t.product_image} width={200} height={200} src={`${i.image ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image}` : '/no_image.png'}`} />
                        <p className="text-sm text-nowrap font-bold truncate text-center my-2 py-2">{i.name}</p>
                    </Link>
                ))}
            </div>

            <div ref={bottomRef} className="h-2 w-full" />
        </div>
    );
}