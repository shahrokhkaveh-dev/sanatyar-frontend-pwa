'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Archive({ locale, t, data }) {
    const [loading, setLoading] = useState(false);
    const [letters, setletters] = useState([])


    useEffect(() => {
        if (letters.length <= 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
        if (data.letters.length > 0) {
            setletters(data.letters)
        }
    }, [data, letters])


    return (
        <div className="flex flex-col gap-y-2 mx-auto p-6">
            {letters.map((i) => (
                <Link key={i.letter_id} href={`/${locale}/AutomationSystem/Inbox/${i.letter_id}`} className="bg-white flex flex-row gap-x-2 rounded-lg py-1.5 px-1">
                    <Image quality={100} className="h-20 w-16" src={i.logo ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.logo}` : '/no_image.png'} width={100} height={100} alt="logo" />
                    <div className="w-full flex flex-col justify-around">
                        <p className="text-base font-bold text-blue-800">{i.title}</p>
                        <p className="text-xs text-neutral-500">فرستنده: {i.name}</p>
                        <div className="text-xs text-neutral-500 w-full flex flex-row justify-between">
                            <p>شماره نامه: {i.number}</p>
                            <p>{i.created_at}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}