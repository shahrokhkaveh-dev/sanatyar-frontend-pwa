'use client'

import { useState } from "react";;
import HeaderItems from "@/components/layout/HeaderItems";
import dynamic from 'next/dynamic';

const MapRoute = dynamic(() => import('../RouteMap'), { ssr: false });

export default function Map({ lng, lat, t }) {
    const [showMap, setShowMap] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowMap(true)}
                className="bg-white rounded-md text-blue-900 px-2 py-1 text-center"
            >
                {t?.show_on_map || "نمایش روی نقشه"}
            </button>

            {showMap &&
                <div style={{ zIndex: "999" }} className="fixed top-0 left-0 w-full h-full  bg-white">
                    <HeaderItems title={t?.map || "نقشه"} action={() => setShowMap(false)} />
                    <MapRoute lat={lat} lng={lng} t={t} />
                </div>}
        </>
    );
}
