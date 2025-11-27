'use client';

import Cookies from "js-cookie";
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(
    () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
    { ssr: false }
);

export default function Loading() {

    const lang = Cookies.get("lang") || 'fa';

    const translate = {
        "fa": "لطفاً منتظر بمانید...",
        "en": "Please wait...",
        "tr": "Lütfen bekleyiniz...",
        "ch": "请稍候...",
        "ar": "يرجى الانتظار..."
    }

    const wait = translate[lang]

    return (
        <div className=" w-full h-screen ">
            <div style={{ zIndex: "999" }} className="flex flex-col items-center justify-center w-full h-screen backdrop-brightness-50  fixed max-w-[576px]    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <LottiePlayer
                    autoplay
                    loop
                    src={"/lottie/loading.json"}
                    style={{ height: "200px", width: "200px", color: "white", }}
                />
                <p className="text-[#fd8834] font-semibold text-center ">{wait || "لطفا منتظر بمانید..."}</p>
            </div>
        </div>
    );
}