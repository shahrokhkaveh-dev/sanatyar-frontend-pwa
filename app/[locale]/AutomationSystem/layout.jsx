import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children, params }) {

    const { locale } = await params;

    const cookie = await cookies()
    if (cookie.get('accessToken')) {
        const res = await api.get('application/panel/profile/reload').catch((err) => servError(err))
    } else {
        redirect(`/${locale}/Login`)
    }

    return (
        <>
            {children}
        </>
    );
}