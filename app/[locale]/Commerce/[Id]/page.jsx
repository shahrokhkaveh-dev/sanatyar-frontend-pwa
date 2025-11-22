import HeaderItems from "@/components/layout/HeaderItems";
import { room } from "@/constans/Room";
import Image from "next/image";
import Link from "next/link";
import { IoBusiness } from "react-icons/io5";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { Id, locale } = await params;

    const t = loadTranslation(locale, 'translate')

    const data = room.find(i => i.cityId === Id);

    return (
        <div className="min-h-screen">
            <HeaderItems title={t.title} href={`/${locale}/Commerce`} />

            <Image quality={100} className="w-full h-52" width={200} height={200} alt="image" src={data.image} />
            <div className="grid grid-cols-2 gap-x-2 mt-3 px-1">
                <Link href={`/${locale}/Brand?city=${data.cityId}`} className="text-blue-900 text-sm w-full bg-white rounded-lg  flex flex-row items-center justify-center h-16 overflow-hidden relative">
                    <IoBusiness className="text-orange-400 text-lg" />
                    <p>{t.brands}</p>
                    <div className="w-[62px] -top-1 -right-5 h-8 bg-blue-900 absolute rotate-45"></div>
                </Link>
                <Link href={`/${locale}/Products?city=${data.cityId}`} className="text-blue-900 text-sm w-full bg-white rounded-lg  flex flex-row items-center justify-center h-16 overflow-hidden relative">
                    <IoBusiness className="text-orange-400 text-lg" />
                    <p>{t.products}</p>
                    <div className="w-[62px] -top-1 -right-5 h-8 bg-blue-900 absolute rotate-45"></div>
                </Link>

            </div>
        </div>
    );
}