'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function OutBox({ res }) {

    const searchParams = useSearchParams()

    const [letters, setLetter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setpage] = useState(searchParams.get("page"))

    const router = useRouter()
    const params = new URLSearchParams(searchParams.toString());

    const loadMoreRef = useRef(null);

    useEffect(() => {
        if (page == res.last_page) return
        params.set("page", page ? parseInt(page) + 1 : 1)
        router.push(`?${params.toString()}`, { scroll: false });
    }, [page])

    useEffect(() => {
        setLetter((perv) => {
            if (res && res.current_page > 1) {
                return [...perv, ...res.letters];
            } else {
                return res.letters;
            }
        })
    }, [res])

    useEffect(() => {
        if (page == res.last_page) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && page < res.last_page && page !== res.current_page) {
                    setpage((perv) => perv + 1)
                }
            },
            {
                rootMargin: "100px",
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [letters, searchParams, page]);

    return (
        <div className="p-1.5 flex flex-col gap-y-1.5">
            {letters.length > 0 && letters.map((i) => (
                <Link key={i.id} href={`/AutomationSystem/Outbox/${i.id}`} className="bg-white flex flex-row gap-x-1 rounded-lg py-1.5 px-1">
                    <Image className="/" src={'/no_image.png'} width={100} height={100} alt="logo" />
                    <div className="w-full flex flex-col justify-around ">
                        <p className="text-base font-bold text-blue-800">{i.name}</p>
                        <p className="text-xs text-neutral-500">نام گیرنده: {i.reciver_name || i.group_name}</p>
                        <div className="text-xs text-neutral-500 w-full flex flex-row justify-between">
                            <p>شماره نامه: {i.number}</p>
                            <p>{i.created_at}</p>
                        </div>
                    </div>
                </Link>
            ))}

            {/* این div وقتی دیده بشه صفحه بعد لود میشه */}
            <div ref={loadMoreRef} className="h-10 w-full bg-transparent flex justify-center items-center">
                {isLoading && letters.length > 0 && <span className="text-xs text-gray-500">در حال بارگذاری...</span>}
            </div>
        </div>
    );
}
