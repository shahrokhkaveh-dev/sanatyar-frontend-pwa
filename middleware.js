import { NextResponse } from "next/server";

const SKIP_PATHS = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/images',
    '/icons',
    '/fonts',
    '/sw',
    '/manifest',
    '/locale' // ← اضافه شد تا کل پوشه پابلیک locale رو رد کنه
];

export function middleware(request) {
    const { pathname, hostname } = request.nextUrl;

    // ==========================
    // 🛡️ Guard Clause: مسیرهای استثنا
    // ==========================
    if (
        pathname.startsWith("/sw") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/fonts") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/icons") ||
        pathname.startsWith("/manifest") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".") // یعنی فایل مثل .jpg .png .js .css و غیره
    ) {
        return NextResponse.next();
    }

    // ==========================
    // 📌 گرفتن IP کاربر
    // ==========================
    const forwardedFor = request.headers.get("x-forwarded-for");
    const userIp = forwardedFor?.split(",")[0]?.trim() || request.ip || "unknown";

    const response = NextResponse.next();
    if (!request.cookies.get("user_ip")?.value) {
        response.cookies.set("user_ip", userIp, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true, // در پروداکشن true باشه
            maxAge: 60 * 60 * 24 * 30
        });
    }

    // ==========================
    // 📱 موبایل/دسکتاپ
    // ==========================
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);

    if (!isMobile && hostname !== 'sanatyariran.com') {
        const redirectResponse = NextResponse.redirect("https://sanatyariran.com");
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: true,
                maxAge: 60 * 60 * 24 * 30
            });
        }
        return redirectResponse;
    }

    // ==========================
    // 🌍 مدیریت زبان
    // ==========================
    const langCookie = request.cookies.get("lang")?.value;
    const validLangs = ["fa", "en", "tr", "ar", "ch"];
    const segments = pathname.split("/").filter(Boolean);
    const currentLang = segments[0];

    // صفحه اصلی
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = langCookie ? `/${langCookie}` : "/selectLang";
        return NextResponse.redirect(url);
    }

    // مسیر بدون زبان اما کوکی دارد
    if (!validLangs.includes(currentLang) && langCookie) {
        const url = request.nextUrl.clone();
        url.pathname = `/${langCookie}${pathname}`;
        return NextResponse.redirect(url);
    }

    // مسیر با زبان متفاوت با کوکی
    if (validLangs.includes(currentLang) && langCookie && langCookie !== currentLang) {
        const url = request.nextUrl.clone();
        segments[0] = langCookie;
        url.pathname = "/" + segments.join("/");
        return NextResponse.redirect(url);
    }

    return response;
}

// ==========================
// ⚡️ Matcher
// ==========================
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*\\.js|fonts|images|icons|.*\\..*).*)",
    ],
};
