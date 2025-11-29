"use client";
import { useEffect, useState } from "react";

let deferredPrompt = null;

export default function InstallPWA() {
    const [showModal, setShowModal] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    const [pwashow, setpwashow] = useState(false)

    useEffect(() => {
        // ✅ اگر قبلاً مودال دیده شده، نمایش نده
        const alreadyShown = localStorage.getItem("pwa-install-shown");
        setpwashow(alreadyShown)

        const isInstalled =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true;

        if (isInstalled) return;

        const iOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
        setIsIOS(iOS);

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setShowModal(true);
        });

        // ✅ ویژه iOS (چون event نداره)
        if (iOS) {
            setShowModal(true);
            localStorage.setItem("pwa-install-shown", "true");
        }

    }, []);

    const installHandler = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        // ✅ بعد از تلاش برای نصب دیگر نمایش داده نشود
        localStorage.setItem("pwa-install-shown", "true");

        deferredPrompt = null;
        setShowModal(false);
    };

    const closeHandler = () => {
        // ✅ حتی اگر کاربر روی "بعداً" بزند دیگر نمایش داده نشود
        localStorage.setItem("pwa-install-shown", "true");
        setShowModal(false);
    };

    if (!showModal) return null;

    if (pwashow) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-white w-[90%] rounded-xl p-5 text-center shadow-xl">

                {isIOS ? (
                    <>
                        <p className="mb-4">
                            برای نصب اپ:
                            <br />
                            دکمه <b>Share</b> را انتخاب کرده و سپس
                            <b> Add to Home Screen</b> را بزنید.
                        </p>
                        <button
                            onClick={closeHandler}
                            className="w-full bg-gray-700 text-white py-2 rounded-lg"
                        >
                            متوجه شدم
                        </button>
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-x-2">
                        <p className="mb-4 col-span-full">
                            برای دسترسی سریع‌تر و تجربه بهتر، پیشنهاد می‌کنیم اپلیکیشن را روی دستگاه خود نصب کنید.
                        </p>

                        <button
                            onClick={installHandler}
                            className="w-full border border-blue-800 text-blue-800 rounded-lg py-1"
                        >
                            نصب اپلیکیشن
                        </button>

                        <button
                            onClick={closeHandler}
                            className="w-full border border-red-500 text-red-500 rounded-lg py-1"
                        >
                            بعداً
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
