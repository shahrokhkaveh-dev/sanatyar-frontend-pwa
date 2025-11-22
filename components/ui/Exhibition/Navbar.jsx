'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar({ locale, t }) {

    const pathname = usePathname()
    const searchParams = useSearchParams();


    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    return (

        <div className="flex flex-row justify-center items-center gap-x-6 bg-white border-t-[1px] border-neutral-200 py-2">
            <Link className={`${pathname.includes('Brands') ? 'text-blue-800' : "text-neutral-700"}`} href={`/${locale}/Exhibition/Search/Brands${query}`}>
                {t.companies}
            </Link>
            <Link className={`${pathname.includes('Products') ? 'text-blue-800' : "text-neutral-700"}`} href={`/${locale}/Exhibition/Search/Products${query}`}>
                {t.products}
            </Link>
        </div>
    );
}