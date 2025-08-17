import Brand from "@/components/pages/Brand"
import { api } from "@/config/api"
import { servError } from "@/util/Errorhadnler"
import { loadTranslation } from "@/util/translations"



export default async function BrandsPage({ searchParams, params }) {

    const { locale } = await params

    const t = loadTranslation(locale, 'brands')

    const Search = await searchParams

    let loading = true

    const query = new URLSearchParams()
    if (Search.type) query.append('type', Search.type)
    if (Search.category) query.append('category', Search.category)
    if (Search.province) query.append('province', Search.province)
    if (Search.city) query.append('city', Search.city)
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.ipark) query.append('ipark', Search.ipark)
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await api.get(`application/brands${queryString}`).catch(err => servError(err)).finally(() => loading = false);

    if (res.error || (res.status == 200 && !res.data.flag)) {
        <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <>
            <Brand t={t} locale={locale} data={res.status == 200 && res.data.flag && res.data.response.brands.length > 0 ? res.data.response.brands : null} Fainal={res.status == 200 && res.data.flag && res.data.response.is_final} />
        </>
    );
}
