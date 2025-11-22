

import Loading from "@/components/modals/Loading";
import Products from "@/components/pages/Products";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { loadTranslation } from "@/util/translations";

export default async function Page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'products');
    const Search = await searchParams;

    let loading = true

    const query = new URLSearchParams()
    if (Search.category) query.append('category', Search.category)
    if (Search.province) query.append('province', Search.province)
    if (Search.city) query.append('city', Search.city)
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.ipark) query.append('ipark', Search.ipark)
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const data = await fetch(`https://app.sanatyariran.com/api/application/search${queryString}`, { next: { revalidate: 60 } }).catch((err) => servError(err)).finally(() => loading = false)

    if (loading) {
        return <div className="min-h-screen"> <Loading /> </div>
    }

    if (data.error) {
        return <p className="errortag">{data.error}</p>
    }
    const res = await data.json()

    if (res.flag == false) {
        return <p className="errortag">{res.message}</p>
    }


    return (
        <div className="min-h-screen">

            <Products locale={locale} total={res.response.total} t={t} Fainal={res.response.is_final} data={res.response.products} />
        </div>
    );
}