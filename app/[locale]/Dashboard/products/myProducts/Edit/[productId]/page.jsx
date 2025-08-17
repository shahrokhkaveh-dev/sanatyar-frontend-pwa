import { api } from "@/config/api";
import AddProduct from "@/components/pages/AddProduct";
import { redirect } from "next/navigation";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {

    const { productId, locale } = await params

    const t = await loadTranslation(locale, 'myProducts');


    if (!productId) {
        redirect('/Dashboard/products/myProducts')
    }

    const res = await api.get(`/application/panel/products/edit/${productId}`)


    return (
        <AddProduct t={t} locale={locale} pervData={res.data.response} />
    );
}