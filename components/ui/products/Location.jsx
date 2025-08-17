'use client';

import { useState } from "react";
import dynamic from 'next/dynamic'
import { ImLocation2 } from "react-icons/im";
import HeaderItems from "@/components/layout/HeaderItems";

const MapRoute = dynamic(() => import("../RouteMap"), { ssr: false });

export default function Location({ data }) {
    const [show, setShow] = useState(false);

    const closeMap = () => {
        setShow(false)
    }


    return (
        <>
            <div
                onClick={() => setShow(true)}
                className="bg-white relative flex flex-col rounded-lg justify-center min-h-[70px] w-24 items-center overflow-hidden px-0.5 py-1"
            >
                <ImLocation2 className="text-4xl text-orange-400" />
                <p className="text-sm font-bold text-blue-900 mt-1.5">
                    {data.province}، {data.city}
                </p>
                <div className="w-[79px]  h-[31px] absolute bg-blue-800 top-0 -right-10 rotate-45"></div>
            </div>

            {/* فقط وقتی show == true نمایش بده */}
            {show && (
                <div className="fixed top-0 right-0 w-full z-50 h-screen flex flex-col">
                    <HeaderItems title={"نقشه"} action={closeMap} />
                    <MapRoute
                        destination={{ lng: data.brand_lng, lat: data.brand_lat }}
                    />

                </div>
            )}
        </>
    );
}
