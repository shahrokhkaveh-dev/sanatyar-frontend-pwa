'use client'

import HeaderItems from "@/components/layout/HeaderItems";
import Image from "next/image";
import { useState } from "react";

export default function ShowImage({ data, t }) {

    const [show, setShow] = useState(false)

    return (
        <>
            <button onClick={() => setShow(true)} className="text-xs">{t.show_all}</button>
            {show &&
                <div style={{ zIndex: 999 }} className="absolute top-0 right-0 w-full h-full bg-neutral-100 overflow-y-auto">
                    <HeaderItems title={t.company_gallery} action={() => setShow(false)} />
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        {data.images.map((i, index) => (
                            <div key={index} className="bg-white rounded-lg pb-2 w-full h-44 flex flex-col">
                                <Image width={200} className="w-full h-full object-contain " height={200} alt={index} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}/${i.image_path}`} />
                                {i.title && <p className="pt-2 px-1.5 text-center mt-1">{i.title}</p>}
                            </div>

                        ))}
                    </div>
                </div>
            }
        </>
    );
}