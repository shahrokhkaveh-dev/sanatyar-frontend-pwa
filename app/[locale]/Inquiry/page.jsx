

import HeaderItems from "@/components/layout/HeaderItems";
import { servError } from "@/util/Errorhadnler";
import Image from "next/image";
import { statusby } from "@/constans/status";
import { FaCalendarAlt } from "react-icons/fa";
import { HiDocumentCheck } from "react-icons/hi2";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from "next/link";
import Response from "@/components/ui/Inquiry/Response";
import Navigation from "@/components/ui/Inquiry/Navigation";
import { api } from "@/config/api";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params

    const t = loadTranslation(locale, 'inquiry')

    const res = await api.get('application/panel/products/response').catch(err => servError(err))
    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems title={t.title} href={`/${locale}`} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }



    return (
        <div className="min-h-screen ">
            <div className="sticky top-0 z-[49] bg-white">
                <HeaderItems title={t.title} href={`/${locale}`} />
                <Navigation locale={locale} t={t} />
            </div>
            <div className="flex flex-col gap-y-2 py-2 px-1.5 ">
                {res.data.response.data.length > 0 && res.data.response.data.map((i) => (
                    <div key={i.id} className={`border-[1px] flex flex-col border-blue-900  rounded-md ${i.status === 1 ? "bg-white" : i.status === 2 ? "bg-green-100" : i.status === 3 ? "bg-red-100" : "bg-white"} `}>
                        <div className="flex flex-row items-center gap-x-1 py-2">
                            <Image className="w-24 bg-white py-4 rounded-md" alt={t.product_image} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.product_image}`} width={200} height={200} />
                            <div className="flex flex-col gap-y-1 px-1 text-xs font-bold">
                                <p className="text-base font-bold">{i.product_name}</p>
                                <p >{t.request_count}: {i.number}</p>
                                <p >{t.company_name}: {i.destination_name}</p>
                                <p >{t.inquiry_recipient}: {i.author}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center px-2 py-1.5 text-xs  font-semibold">
                            <p className=""> {t.request_status}: {statusby[i.status]}</p>
                            <p className=" text-black flex flex-row items-center gap-x-1">
                                {t.request_date}: {i.created_at}
                                <FaCalendarAlt className="text-blue-900 text-sm" />
                            </p>
                        </div>
                        <Response locale={locale} t={t} id={i.id} />
                        <div className="border-t-[1px] border-black p-1 flex justify-center">
                            <Link href={`/${locale}/Inquiry/${i.id}`} className="bg-blue-800 text-white text-base font-bold  py-2 px-3 rounded-md">{t.show_inquiry_details}</Link>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}