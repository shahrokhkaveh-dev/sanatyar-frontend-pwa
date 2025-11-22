import { NextResponse } from "next/server";

export function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // --------------------------------------
    // ⛔ استثناء ها: API، فایل‌ها، next، public
    // --------------------------------------
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/fonts") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/icons") ||
        pathname.startsWith("/sw") ||
        pathname.startsWith("/manifest") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next(); // هیچ redirect یا تغییر locale انجام نشود
    }

    const response = NextResponse.next();

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
    // موبایل/دسکتاپ
    // --------------------
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);
    if (!isMobile) {
        const redirectResponse = NextResponse.redirect("https://sanatyariran.com");
        redirectResponse.cookies.set("user_ip", userIp);
        return redirectResponse;
    }

    // --------------------
    // مدیریت زبان
    // --------------------
    const langCookie = request.cookies.get("lang")?.value || null;

    // صفحه اصلی
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = langCookie ? `/${langCookie}` : "/selectLang";
        const redirectResponse = NextResponse.redirect(url);
        redirectResponse.cookies.set("user_ip", userIp);
        return redirectResponse;
    }

    // صفحات با زبان
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

    return response;
}

// matcher ساده، فقط همه چیز بجز _next/static و فایل‌ها
export const config = {
    matcher: ["/((?!_next/static|.*\\..*).*)"]
};
