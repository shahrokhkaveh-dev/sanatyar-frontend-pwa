import Brand from "@/components/pages/Brand";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {

    const { locale } = await params
    const Search = await searchParams;

    const query = new URLSearchParams()
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.category) query.append('category', Search.category)
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res = await api.get(`application/brands${queryString}`).catch((err) => servError(err))

    const t = loadTranslation(locale, 'brands')
    return (
        <>
            <Brand t={t} total={res.data.response.total} locale={locale} data={res.data.response.brands.length > 0 ? res.data.response.brands : null} Fainal={res.data.flag && res.data.response.is_final} />
        </>
    );
}