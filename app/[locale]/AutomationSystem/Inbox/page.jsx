import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import Inbox from "@/components/pages/Inbox";
import { servError } from "@/util/Errorhadnler";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'automationSystem');
    const search = await searchParams
    const page = await search?.page || 1;

    const res = await api.get(`application/panel/as/inbox?page=${page}`).catch(err => servError(err))
    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <>
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.inbox} />
            <Inbox res={res.data.response} />
        </>
    );
}