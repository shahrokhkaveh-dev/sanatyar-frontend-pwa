
import Loading from "@/components/modals/Loading";
import Products from "@/components/pages/Products";
import { api } from "@/config/api";
import { loadTranslation } from "@/util/translations";

export default async function Page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'products');
    const Search = await searchParams;

    const query = new URLSearchParams()
    if (Search.category) query.append('category', Search.category)
    if (Search.province) query.append('province', Search.province)
    if (Search.city) query.append('city', Search.city)
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.ipark) query.append('ipark', Search.ipark)
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res = await api.get(`application/search${queryString}`).catch(err => console.log(err))
    let loading = true
    if (res && "status" in res) {
        loading = false
    } else {
        loading = true
    }

    return (
        <div className="min-h-screen">
            {loading && <Loading />}
            <Products locale={locale} t={t} Fainal={res.data.response.is_final} data={res.data.response.products} />
        </div>
    );
}