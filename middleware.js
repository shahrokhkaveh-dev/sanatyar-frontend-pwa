import { NextResponse } from "next/server";

export function middleware(request) {
    const response = NextResponse.next(); // همیشه همین ریسپانس پایه را بساز

    // --------------------
    // 📌 گرفتن IP کاربر
    // --------------------
    const forwardedFor = request.headers.get("x-forwarded-for");
    const userIp = forwardedFor?.split(",")[0]?.trim() || request.ip || "unknown";

    const ipCookie = request.cookies.get("user_ip")?.value;

    if (!ipCookie) {
        response.cookies.set("user_ip", userIp, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 60 * 60 * 24 * 30
        });
    }
    // --------------------

    const pathname = request.nextUrl.pathname;
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);

    // کامپیوتر → ریدایرکت
    if (!isMobile) {
        const redirectResponse = NextResponse.redirect("https://sanatyariran.com");
        // اگر خواستی این redirect هم کوکی بگیرد:
        redirectResponse.cookies.set("user_ip", userIp);
        return redirectResponse;
    }

    const langCookie = request.cookies.get("lang")?.value || null;

    // مسیرهای استثناء
    if (
        pathname.startsWith("/sw") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/fonts") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/icons") ||
        pathname.startsWith("/manifest") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return response; // ریسپانسی که کوکی داره
    }

    // اگر صفحه اصلی بود
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = langCookie ? `/${langCookie}` : "/selectLang";

        const redirectResponse = NextResponse.redirect(url);
        redirectResponse.cookies.set("user_ip", userIp);
        return redirectResponse;
    }

    // سیستم زبان‌ها
    const segments = pathname.split("/").filter(Boolean);
    const validLangs = ["fa", "en", "tr", "ar", "ch"];
    const currentLang = segments[0];
    const url = request.nextUrl.clone();

    if (validLangs.includes(currentLang)) {
        if (langCookie && langCookie !== currentLang) {
            segments[0] = langCookie;
            url.pathname = "/" + segments.join("/");
            const redirectResponse = NextResponse.redirect(url);
            redirectResponse.cookies.set("user_ip", userIp);
            return redirectResponse;
        }
    } else {
        if (langCookie) {
            url.pathname = `/${langCookie}${pathname}`;
            const redirectResponse = NextResponse.redirect(url);
            redirectResponse.cookies.set("user_ip", userIp);
            return redirectResponse;
        }
    }

    return response; // همیشه همین response با کوکی ست شده
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*\\.js|fonts|images|icons|.*\\..*).*)",
    ],
};
