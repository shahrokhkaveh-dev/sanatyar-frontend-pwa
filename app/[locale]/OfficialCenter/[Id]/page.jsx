import Header from "@/components/layout/Header";
import HeaderItems from "@/components/layout/HeaderItems";
import Brand from "@/components/pages/Brand";
import { api } from "@/config/api";
import { loadTranslation } from "@/util/translations";

export default async function page({ params, searchParams }) {
    const { Id, locale } = await params;
    const Search = await searchParams;
    const t = loadTranslation(locale, 'OfficialCenter');

    const res = await api.get(`application/brands?category=${Id}&type=5&&province=${Search.province || ''}`)

    if (res.error || (res.status == 200 && !res.data.flag)) {
        return (
            <div>
                <HeaderItems title={t.title} href={`/${locale}/OfficialCenter`} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        );
    }

    return (
        <div>
            <HeaderItems title={t.title} href={`/${locale}/OfficialCenter`} />
            <Brand locale={locale} t={t} data={res.status == 200 && res.data.flag && res.data.response.brands.length > 0 ? res.data.response.brands : null} Fainal={res.status == 200 && res.data.flag && res.data.response.is_final} />
        </div>
    );
}