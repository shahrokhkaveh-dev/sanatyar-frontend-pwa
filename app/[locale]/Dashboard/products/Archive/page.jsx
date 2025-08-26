import HeaderItems from "@/components/layout/HeaderItems";
import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import Image from "next/image";
import Link from "next/link";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params
    const t = await loadTranslation(locale, 'automationSystem')


    const res = await api.post('application/panel/profile/wishlist').catch(err => servError(err))

    if ((res.status == 200 && !res.data.flag) || res.error) {
        return <p className="errortag text-nowrap">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <>
            <HeaderItems title={t.archive_products} />
            <div className="grid grid-cols-2 gap-2 px-2">
                {res.data.response.map((i) => (
                    <Link href={`/${locale}/Products/${i.slug}`} key={i.id} className="w-full py-2.5 pb-1 rounded-md flex flex-col bg-white">
                        <Image className="w-full h-40" alt="product" width={200} height={200} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.img}`} />
                        <div className="flex flex-row mt-2.5 px-1">
                            <p className="text-sm w-full truncate text-center font-bold">{i.name}</p>

                        </div>


                    </Link>
                ))}
            </div>
        </>
    );
}