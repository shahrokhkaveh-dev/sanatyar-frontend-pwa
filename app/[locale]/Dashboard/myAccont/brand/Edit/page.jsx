import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import EditBrand from "@/components/pages/EditBrand";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = params;
    const t = await loadTranslation(locale, 'myAccont');

    const res = await api.get('application/panel/brand/edit').catch((err) => servError(err))

    if (res.error || (res.data && !res.data.flag)) {

        return (
            <div>
                <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t?.edit_company || "صنعت یار ایران"} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )

    }

    return (
        <EditBrand data={res.data.response} locale={locale} t={t} />
    );
}