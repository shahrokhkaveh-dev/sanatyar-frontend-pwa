import Cookies from 'js-cookie';

export const getLanguage = async () => {
    if (typeof window !== "undefined") {
        // در محیط مرورگر
        const accessToken = Cookies.get("lang") || 'fa';
        return accessToken == "ar" ? "ar-SA" : accessToken == "en" ? "en-US" : accessToken == "tr" ? "tr-TR" : accessToken == "ru" ? "ru-RU" : accessToken == "ch" ? "zh-CN" : "fa-IR"
    }

    // در محیط سرور
    const { cookies } = await import('next/headers');
    const cookie = await cookies();
    const accessToken = cookie.get('lang')?.value || 'fa';

    return accessToken == "ar" ? "ar-SA" : accessToken == "en" ? "en-US" : accessToken == "tr" ? "tr-TR" : accessToken == "ru" ? "ru-RU" : accessToken == "ch" ? "zh-CN" : "fa-IR"
}
