import HeaderItems from "@/components/layout/HeaderItems";
import { room } from "@/constans/Room";
import Image from "next/image";
import Link from "next/link";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {

    const { locale } = await params

    const t = loadTranslation(locale, 'translate')

    return (
        <div className="min-h-screen">
            <HeaderItems title={t.title} href={`/${locale}`} />
            <Image className="w-full" src={'/room_iran.jpg'} width={200} height={100} alt="room_iran" />
            <div className=" px-2 py-4 flex flex-col gap-y-1">
                {room.map((i, index) => (
                    <Link href={`/${locale}/Commerce/${i.cityId}`} key={index} className="p-2 bg-white rounded-md flex flex-row gap-x-2 items-center">
                        <Image className="" width={50} src={'/room_logo.png'} height={50} alt="room" />
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs font-semibold">{i.title}</p>
                            <p className="text-[9px]">{i.addres}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}