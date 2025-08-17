'use client'

import Image from "next/image";

export default function Error({ error, reset }) {
    return (
        <div className="fixed w-full h-full bg-white top-0 right-0 flex flex-col justify-center items-center gap-y-5">
            <Image className="md:w-48 sm:w-36 w-32" alt="error" src={'/serverror.png'} width={1000} height={1000} />
            <p className="sm:text-3xl  md:font-semibold text-2xl">خطای 500</p>
            <p className="text-xs sm:text-sm md:font-normal font-light">خطای ارتباط با سرور!</p>
            <button onClick={() => reset()} className="bg-blue-800 text-white w-36 sm:w-48 md:w-60 rounded-lg py-2 sm:text-base text-xs">دوباره تلاش کنید</button>
        </div>
    );
}