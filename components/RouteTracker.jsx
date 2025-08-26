'use client';
import { getCookie } from '@/util/Cookie';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function RouteTracker() {
    const pathname = usePathname();
    const [android, setAndroid] = useState(null);

    const router = useRouter()

    const checkCookie = async () => {
        if (pathname.includes("selectLang") || pathname.includes("login")) return
        const cookie = await getCookie() || null
        const lang = Cookies.get('lang') || null

        if (!cookie && !lang) {
            router.push('/selectLang')
        } else if (!cookie && lang) {
            router.push(`/${lang}/Login`)
        }
    }

    useEffect(() => {
        const width = window.innerWidth;

        // if (width >= 768) {

        //     router.push("https://sanatyariran.com");
        // }
        if (typeof navigator === 'undefined') {
            setAndroid(false);
        } else {
            setAndroid(/Android/i.test(navigator.userAgent));
        }
    }, []);

    useEffect(() => {
        checkCookie()

        // ذخیره مسیر قبلی فقط وقتی pathname تغییر کنه
        const segments = pathname.split('/').filter(Boolean);
        const prevurl = segments.slice(0, segments.length - 1).join('/');
        sessionStorage.setItem('prevPath', `/${prevurl}`);

    }, [pathname]);

    useEffect(() => {
        if (android) {
            tryOpenApp();
        }
    }, [android]);

    const tryOpenApp = () => {
        const timeout = 1500;
        const t0 = Date.now();

        window.location.href = 'sanatyariran.com://payment';

        setTimeout(() => {


        }, timeout);
    };

    return <><ToastContainer /></>
}
