'use client'

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-full absolute bg-white ">
            <div className="flex flex-col items-center justify-center gap-y-4 fixed w-fit h-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" >
                <Image className="md:w-56 sm:w-44 w-36" alt="error" src={'/notfound.png'} width={1000} height={1000} />
                <p className="sm:text-3xl  md:font-semibold text-2xl">خطای 404</p>
                <p className="text-xs  md:text-base md:font-normal font-light">متاسفانه این صفحه یافت نشد!</p>
                <Link href={'/'} onClick={() => reset()} className="bg-blue-800 text-white  px-6 rounded-lg py-2 sm:text-base text-xs text-center">بازگشت به صفحه اصلی</Link>
            </div>
        </div>
    );
}