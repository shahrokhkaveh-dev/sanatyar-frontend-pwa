import { NextResponse } from "next/server";

// مسیرهایی که میدل‌ور نباید روی آن‌ها اجرا شود
// این کار خوانایی کد را بالا می‌برد
const SKIP_PATHS = [
    '/api/:path*',
    '/_next/static/:path*',
    '/_next/image/:path*',
    '/favicon.ico',
    '/images/:path*',
    '/icons/:path*',
    '/fonts/:path*',
    '/sw.js',
    '/manifest.json',
];

export function middleware(request) {
    const { pathname, hostname } = request.nextUrl;

    // ==========================
    // 🛡️ Guard Clause: استثناها
    // ==========================
    // اگر مسیر در لیست استثناها بود، بلافاصله کار را تمام کن و برو سراغ درخواست بعدی
    // این قوی‌ترین راه برای جلوگیری از اجرای بقیه کد است
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/icons') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/sw') ||
        pathname.startsWith('/manifest') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // ==========================
    // 📌 گرفتن IP کاربر
    // ==========================
    const forwardedFor = request.headers.get("x-forwarded-for");
    const userIp = forwardedFor?.split(",")[0]?.trim() || request.ip || "unknown";

    // یک پاسخ اصلی برای تنظیم کوکی‌ها ایجاد می‌کنیم
    const response = NextResponse.next();
    if (!request.cookies.get("user_ip")?.value) {
        response.cookies.set("user_ip", userIp, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true, // در پروداکشن حتما true باشد
            maxAge: 60 * 60 * 24 * 30
        });
    }

    // ==========================
    // 📱 موبایل/دسکتاپ
    // ==========================
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);

    // اگر کاربر موبایل نبود و در دامنه اصلی هم نبود، ریدایرکت کن
    if (!isMobile && hostname !== 'sanatyariran.com') {
        const redirectResponse = NextResponse.redirect("https://sanatyariran.com");
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, {
                path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30
            });
        }
        return redirectResponse;
    }

    // ==========================
    // 🌍 مدیریت زبان (فقط برای کاربران موبایل)
    // ==========================
    const langCookie = request.cookies.get("lang")?.value;
    const validLangs = ["fa", "en", "tr", "ar", "ch"];
    const segments = pathname.split("/").filter(Boolean);
    const currentLang = segments[0];

    // صفحه اصلی
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = langCookie ? `/${langCookie}` : "/selectLang";
        const redirectResponse = NextResponse.redirect(url);
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, { path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30 });
        }
        return redirectResponse;
    }

    // اگر مسیر با زبان معتبر شروع نمی‌شود و کاربر زبان در کوکی دارد
    if (!validLangs.includes(currentLang) && langCookie) {
        const url = request.nextUrl.clone();
        url.pathname = `/${langCookie}${pathname}`;
        const redirectResponse = NextResponse.redirect(url);
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, { path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30 });
        }
        return redirectResponse;
    }

    // اگر مسیر با زبان معتبر شروع شده ولی با زبان کوکی متفاوت است
    if (validLangs.includes(currentLang) && langCookie && langCookie !== currentLang) {
        const url = request.nextUrl.clone();
        segments[0] = langCookie;
        url.pathname = "/" + segments.join("/");
        const redirectResponse = NextResponse.redirect(url);
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, { path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30 });
        }
        return redirectResponse;
    }

    // اگر هیچ ریدایرکتی لازم نبود، پاسخ اصلی را برگردان
    return response;
}

// Matcher را هم برای عملکرد بهتر، دقیقاً مطابق با مسیرهای استثنا تنظیم می‌کنیم
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, images, icons, fonts, etc.
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts|sw|manifest).*)',
    ],
};