import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import Archive from "@/components/pages/Archive";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'automationSystem');
    const page = await searchParams?.page || 1;



    const res = await api.get(`application/panel/as/archive?page=${page}`)

    if (res.error || !res.data.flag) {
        return <div>
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.archive_title} />
            <p className="errortag">{res.error ? res.error : res.data.message}</p>
        </div>
    }



    return (
        <div>
            <HeaderItems href={`/${locale}/AutomationSystem`} title={t.archive_title} />
            <Archive res={res.data.response} />
        </div>
    );
}