import { api } from "@/config/api";
import InquiruDetail from "@/components/ui/Inquiry/InquiruDetail";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { InquiryId, locale } = await params;
    const res = await api.post('application/panel/products/inquiry', { id: InquiryId }).catch(err => servError(err))
    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems href={`/${locale}/Inquiry`} title={"استعلام"} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        );
    }
    return (
        <InquiruDetail t={t} locale={locale} data={res.data.response.inquiry} myproduct={false} />
    );
}