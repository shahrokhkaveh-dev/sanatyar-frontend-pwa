'use client';


import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(
    () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
    { ssr: false }
);

export default function Loading({ t }) {
    return (
        <div style={{ zIndex: "999" }} className="fixed  top-0 right-0 backdrop-brightness-50 w-full h-full ">
            <div className="flex flex-col items-center justify-center w-fit h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <LottiePlayer
                    autoplay
                    loop
                    src={"/lottie/loading.json"}
                    style={{ height: "200px", width: "200px", color: "white", }}
                />
                <p className="text-orange-400 font-semibold text-center ">{t?.loading_message || "لطفا منتظر بمانید..."}</p>
            </div>
        </div>
    );
}