"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

export default function HeaderItems({ title, href, action }) {

    const router = useRouter()

    const [prevurl, setPrevurl] = useState("")

    const pathname = usePathname();

    const { locale } = useParams()

    useEffect(() => {
        const prev = sessionStorage.getItem('prevPath') || '/'

        setPrevurl(prev)

    }, [pathname])

    return (
        <header className={` w-full py-3 bg-white flex flex-row justify-between px-4 items-center sticky top-0  z-[49] ${locale == 'fa' || locale == 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <Link href={`/${locale}`} className="text-3xl text-orange-400" ><IoHome /></Link>
            <p className="text-blue-800 text-lg  font-bold">{title}</p>
            {action && <button onClick={action} className="text-blue-800 "><FaArrowLeftLong className="text-xl" /> </button>}
            {!action && <button onClick={() => router.back()} className="text-blue-800"><FaArrowLeftLong className="text-xl" /> </button>}
        </header>
    );
}