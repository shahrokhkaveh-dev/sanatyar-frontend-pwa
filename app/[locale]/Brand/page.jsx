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
    if (Search.city !== undefined && (Search.city || Search.city.toString() === "0")) query.append('city', Search.city)
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.ipark) query.append('ipark', Search.ipark)
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const data = await fetch(`https://app.sanatyariran.com/api/application/brands${queryString}`, { next: { revalidate: 60 } }).catch((err) => servError(err)).finally(() => loading = false)

    if (data.error) {
        return <p className="errortag">{data.error}</p>
    }

    const res = await data.json()

    if (res.flag == false) {
        <p className="errortag">{res.message}</p>
    }

    return (
        <>
            <Brand t={t} total={res.response.total} locale={locale} data={res.response.brands.length > 0 ? res.response.brands : null} Fainal={res.flag && res.response.is_final} />
        </>
    );
}
