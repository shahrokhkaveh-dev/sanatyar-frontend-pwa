'use client'

import Link from "next/link";
import Filter from "../ui/Filter";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { TbCategoryFilled } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import Loading from "../modals/Loading";
import { usePathname } from "next/navigation";
export default function Brand({ data, Fainal, t, locale }) {

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const pathName = usePathname()


    const searchParams = useSearchParams();

    useEffect(() => {
        if (data === null) {
            setLoading(false)
            return
        }

        if (data && data.length > 0) {
            setLoading(false)
        } else if (!Fainal === true && data.length === 0) {
            setLoading(true)
        }

        setBrands((perv) => {
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
                if (entries[0].isIntersecting && brands.length > 0 && Fainal == false) {
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
    }, [brands, Fainal, page, searchParams]);


    return (
        <div className="flex flex-col gap-y-2.5 px-1.5 min-h-screen">
            {loading && <Loading />}
            <Filter locale={locale} t={t} setBrands={setBrands} />
            {brands && typeof brands !== 'string' && brands.length > 0 && brands.map((i, index) => (
                <Link href={`${!pathName.includes('Mokatebat') ? `/${locale}/Brand/${i.slug}` : `/${locale}/AutomationSystem/Send?company=${i.name}`}`} className="h-28 max-h-96 bg-white rounded-lg w-full grid grid-cols-4 items-center py-1.5 px-2 gap-x-1.5" key={index}>
                    <Image alt="logo" width={200} height={200} className="max-w-full h-full max-h-20 object-contain" src={`${i.logo_path ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.logo_path}` : '/no_image.png'}`} />
                    <div className={` col-span-3 w-full h-full flex flex-col justify-between`}>
                        <div>
                            <p className="text-base line-clamp-1 font-extrabold mb-1">{i.name}</p>
                            <p className="text-[10px] font-semibold line-clamp-2">{i.address}</p>
                        </div>
                        <div className="grid grid-cols-3  text-[10px]">
                            <span className={`flex flex-row items-center gap-x-1 col-span-2 text-nowrap truncate font-semibold`}><span className="text-orange-400 text-base"><TbCategoryFilled /></span>{i.category_name}</span>
                            <span className="flex flex-row items-center gap-x-1 w-full pr-1 text-xs"><IoLocation className="text-orange-400 text-base" />{i.city_name} </span>
                        </div>
                    </div>
                </Link>
            ))}
            <div ref={bottomRef} className="h-6" />
        </div>
    );
}