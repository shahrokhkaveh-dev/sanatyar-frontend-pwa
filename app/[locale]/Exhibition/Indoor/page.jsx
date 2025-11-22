import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }) {

    const { locale } = await params

    const t = loadTranslation(locale, 'Exhibition')

    return (
        <div className="">
            <HeaderItems title={t.domestic_exhibition_calendar} href={"/"} />
            <Image className="bg-transparent w-full h-64  mb-4 object-contain" quality={100} alt="car" src={'/car.png'} width={1000} height={1000} />
            <Link href={`/${locale}/Exhibition/Search/Brands?category=7823`} className="flex flex-row gap-x-2 bg-white p-1 items-center">
                <Image className="w-32 h-28 object-contain " src={"/ex.jpg"} alt="ex" width={1000} height={1000} quality={100} />
                <div className="text-[10px]">

                    <p className="text-xs font-bold text-orange-400 mb-3">
                        هجدهمین نمایشگاه قطعات لوازم و مجموغه خودرو
                    </p>
                    <p>
                        آدرس: محل دائمی نمایشگاه های بین المللی تهران
                    </p>
                    <p className="mt-1.5">
                        تاریخ برگزاری: 8 تا 11 خرداد ماه 1404
                    </p>
                </div>
            </Link>
        </div>
    );
}