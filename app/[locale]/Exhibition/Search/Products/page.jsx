import Products from "@/components/pages/Products";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'products');

    const Search = await searchParams;

    const query = new URLSearchParams()
    if (Search.search) query.append('search', Search.search)
    if (Search.page) query.append('page', Search.page)
    if (Search.category) query.append('category', Search.category)
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res = await api.get(`application/search${queryString}`).catch((err) => servError(err))

    if (res.error) {
        return <p className="errortag">{data.error}</p>
    }


    if (res.data.flag == false) {
        return <p className="errortag">{res.data.message}</p>
    }

    return (
        <div className="min-h-screen">

            <Products locale={locale} total={res.data.response.total} t={t} Fainal={res.data.response.is_final} data={res.data.response.products} />
        </div>
    );
}