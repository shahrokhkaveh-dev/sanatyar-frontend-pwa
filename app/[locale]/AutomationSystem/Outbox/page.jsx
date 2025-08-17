import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import OutBox from "@/components/pages/OutBox";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'automationSystem');
    const page = searchParams?.page || 1;

    const res = await api.get(`application/panel/as/outbox?page=${page}`).catch(err => servError(err))
    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <>
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.outbox} />
            <OutBox res={res.data.response} />
        </>

    );
}