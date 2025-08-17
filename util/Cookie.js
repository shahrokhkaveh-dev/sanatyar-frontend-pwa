import Cookies from "js-cookie";

export const getCookie = async () => {
    if (typeof window !== "undefined") {
        // در محیط مرورگر
        const accessToken = Cookies.get("accessToken") || '';
        return accessToken;
    }

    // در محیط سرور
    const { cookies } = await import('next/headers');
    const cookie = await cookies();
    const accessToken = cookie.get('accessToken')?.value || '';

    return accessToken;
}