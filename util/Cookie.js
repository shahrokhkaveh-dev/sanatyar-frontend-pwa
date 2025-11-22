import Cookies from "js-cookie";

export const getCookie = async () => {
    if (typeof window !== "undefined") {
        // در محیط مرورگر
        const accessToken = Cookies.get("accessToken") || '';
        const ip = Cookies.get("user-ip") || ""
        return { accessToken, ip };
    }

    // در محیط سرور
    const { cookies } = await import('next/headers');
    const cookie = await cookies();
    const accessToken = cookie.get('accessToken')?.value || '';
    const ip = cookie.get("user-ip")?.value || ""


    return { accessToken, ip }
}