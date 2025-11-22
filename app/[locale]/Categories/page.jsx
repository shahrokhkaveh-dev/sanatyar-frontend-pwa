import Image from "next/image";
import { servError } from "@/util/Errorhadnler";
import Link from "next/link";
import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {

    const { locale } = await params

    const t = loadTranslation(locale, 'translate')

    const res = await api.get('application').catch(err => servError(err))

    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems title={t.inquiry} href={`/${locale}`} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-3  gap-1.5 p-3">
            {res.data.response.categories.map((i) => (
                <Link key={i.id} href={`/${locale}/Products?category=${i.id}`} className="bg-white overflow-hidden pb-1 flex flex-col gap-y-1.5 rounded-md text-xs font-bold ">

                    <Image quality={100} className="h-36 w-full" width={200} height={200} alt={i.name} src={`${i.image ? `${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image}` : "/no_image.png"}`} />
                    <div className="relative overflow-hidden">
                        <p className="w-full text-nowrap truncate text-center z-10 relative">
                            {i.name}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}