import { NextResponse } from 'next/server';

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    // لیست مسیرهایی که نمی‌خوای کوکی براشون ست بشه
    const ignoredPaths = [
        '/favicon.ico',
        '/icon/favicon.png',
        '/manifest.json',
    ];

    // بررسی کوکی lang
    const langCookie = request.cookies.get('lang');
    const currentLang = langCookie?.value || 'fa';

    // اگر مسیر اصلی (بدون locale) بود، redirect کن
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = `/${currentLang}`;
        return NextResponse.redirect(url);
    }

    // بررسی اینکه آیا مسیر با locale شروع می‌شود
    const pathnameHasLocale = /^\/[a-z]{2}(-[A-Z]{2})?(\/|$)/.test(pathname);

    // اگر مسیر locale نداشت و مسیر اصلی نبود، redirect کن
    if (!pathnameHasLocale && pathname !== '/') {
        const url = request.nextUrl.clone();
        url.pathname = `/${currentLang}${pathname}`;
        return NextResponse.redirect(url);
    }

    // اگه مسیر جزو مسیرهای نادیده گرفته شده بود، هیچ کوکی ست نکن
    if (
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/api') &&
        !ignoredPaths.includes(pathname) &&
        !pathname.includes('Signin')
    ) {
        // مسیر را URL-encode می‌کنیم تا از تبدیل به %2F و ... جلوگیری کنیم
        const encodedPath = pathname; // مسیر را encode می‌کنیم
        response.cookies.set('current_path', encodedPath, {
            path: '/',
            httpOnly: false,
        });

        // ست کردن کوکی lang اگر وجود نداشت
        if (!langCookie) {
            response.cookies.set('lang', 'fa', {
                path: '/',
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 365, // یک سال
            });
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
