import { NextResponse } from "next/server";

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const hostname = request.nextUrl.hostname;

    // --------------------------------------
    // ⛔ استثناءها: این بخش دیگر با matcher جدید کمتر نیاز به اجرا دارد ولی برای اطمینان باقی می‌ماند
    // --------------------------------------
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/fonts") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/icons") ||
        pathname.startsWith("/sw") ||
        pathname.startsWith("/manifest") ||
        pathname.startsWith("/favicon")
    ) {
        return NextResponse.next();
    }

    // --------------------
    // 📌 گرفتن IP کاربر
    // --------------------
    const forwardedFor = request.headers.get("x-forwarded-for");
    const userIp = forwardedFor?.split(",")[0]?.trim() || request.ip || "unknown";

    // یک پاسخ اصلی ایجاد می‌کنیم تا کوکی را در آن تنظیم کنیم
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

    // --------------------
    // موبایل/دسکتاپ
    // --------------------
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);

    // جلوگیری از ریدایرکت بی‌نهایت: فقط اگر در دامنه اصلی نبود، ریدایرکت کن
    if (!isMobile && hostname !== 'sanatyariran.com') {
        const redirectResponse = NextResponse.redirect("https://sanatyariran.com");
        // کوکی IP را هم در پاسخ ریدایرکت تنظیم می‌کنیم
        if (!request.cookies.get("user_ip")?.value) {
            redirectResponse.cookies.set("user_ip", userIp, {
                path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30
            });
        }
        return redirectResponse;
    }

    // --------------------
    // مدیریت زبان (فقط برای کاربران موبایل)
    // --------------------
    const langCookie = request.cookies.get("lang")?.value || null;
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

    // اگر مسیر با زبان معتبر شروع نمی‌شود
    if (!validLangs.includes(currentLang)) {
        // اگر کاربر زبان مورد علاقه خود را در کوکی دارد
        if (langCookie) {
            const url = request.nextUrl.clone();
            url.pathname = `/${langCookie}${pathname}`;
            const redirectResponse = NextResponse.redirect(url);
            if (!request.cookies.get("user_ip")?.value) {
                redirectResponse.cookies.set("user_ip", userIp, { path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30 });
            }
            return redirectResponse;
        }
    } else {
        // اگر مسیر با زبان معتبر شروع شده ولی با زبان کوکی متفاوت است
        if (langCookie && langCookie !== currentLang) {
            const url = request.nextUrl.clone();
            segments[0] = langCookie;
            url.pathname = "/" + segments.join("/");
            const redirectResponse = NextResponse.redirect(url);
            if (!request.cookies.get("user_ip")?.value) {
                redirectResponse.cookies.set("user_ip", userIp, { path: "/", httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30 });
            }
            return redirectResponse;
        }
    }

    // اگر هیچ ریدایرکتی لازم نبود، پاسخ اصلی را برگردان
    return response;
}

// matcher بهینه شده که از اجرای میدل‌ور روی مسیرهای غیرضروری جلوگیری می‌کند
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts|sw|manifest).*)',
    ],
};