

import HeaderDashboard from "@/components/layout/HeaderDashboard";
import { servError } from "@/util/Errorhadnler";
import { api } from "@/config/api";
import { loadTranslation } from "@/util/translations";

export default async function lauout({ children, params }) {
    const { locale } = params;
    const t = loadTranslation(locale, 'myAccont');
    const res = await api.get('application/panel/profile/reload').catch((err) => servError(err))


    if (res.status == 200 && !res.data.flag) {
        return <p className="errortag">{res.data.message}</p>
    }
    return (
        <>
            <HeaderDashboard t={t} locale={locale} user={res.status == 200 && res.data.flag && res.data.response} />
            <div className="min-h-screen ">
                {children}
            </div>
        </>
    );
}