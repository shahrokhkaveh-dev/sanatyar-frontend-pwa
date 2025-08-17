'use client'

import { useState } from "react";
import dynamic from 'next/dynamic'
import HeaderItems from "@/components/layout/HeaderItems";

const MapRoute = dynamic(() => import("../RouteMap"), { ssr: false });

export default function ShowLocation({ lat, lng, t }) {

    const [show, setShow] = useState()

    const closeMap = () => setShow(false)

    return (
        <>
            <button onClick={() => setShow(true)} className="bg-white h-fit text-nowrap text-blue-900 px-2 py-1 rounded-md">{t.map}</button>
            {show && <div style={{ zIndex: "999" }} className="fixed top-0 right-0 w-full h-screen flex flex-col">
                <HeaderItems title={t.map} action={closeMap} />
                <MapRoute
                    lat={lat} lng={lng}
                />

            </div>}

        </>
    );
}