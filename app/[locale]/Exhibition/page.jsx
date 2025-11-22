import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";
import Image from "next/image";
import Link from "next/link";
import { BsClipboard2Fill } from "react-icons/bs";
import { FaBuilding, FaUsers } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoBusiness } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

export default async function page({ params }) {
    const { locale } = await params

    const t = loadTranslation(locale, 'Exhibition')

    return (
        <div className="min-h-screen pb-10">
            <HeaderItems title={'نمایشگاه'} href={`/${locale}`} />
            <div className="w-full ">
                <Image quality={100} alt="image" src={'/exhibition.png'} width={300} height={300} className="w-full h-72 " />
            </div>
            {/* <div className="overflow-hidden whitespace-nowrap w-full py-4">
                <div className="inline-block whitespace-nowrap animate-marquee">
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_1}
                    </p>
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_2}
                    </p>
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_3}
                    </p>
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_4}
                    </p>
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_5}
                    </p>
                    <p className="inline-block px-4 text-sm">
                        {t.exhibition_description_6}
                    </p>
                </div>
            </div> */}
            <div className=" bg-white ">
                <Link className="text-sm flex flex-row  items-center px-2 border-b-[1px] border-neutral-300 py-1.5 w-full justify-between" href={`/${locale}/Exhibition/Indoor`} >
                    <p className="flex flex-row gap-x-4">
                        <FaBuilding className="text-lg text-blue-900" />
                        {t.domestic_exhibition_calendar}
                    </p>
                    <IoIosArrowBack className={`text-lg text-blue-900 ${locale == 'fa' || locale == "ar" ? "rotate-0" : 'rotate-180'}`} />
                </Link>
                <Link className="text-sm pointer-events-none flex flex-row  items-center px-2 border-b-[1px] border-neutral-300 py-1.5 w-full justify-between" href={`/${locale}/News`} >
                    <p className="flex flex-row gap-x-4">
                        <FaUsers className="text-lg text-blue-900" />
                        {t.exhibition_organizers}
                    </p>
                    <IoIosArrowBack className={`text-lg text-blue-900 ${locale == 'fa' || locale == "ar" ? "rotate-0" : 'rotate-180'}`} />
                </Link>
                <Link className="text-sm flex flex-row  items-center px-2 border-b-[1px] border-neutral-300 py-1.5 w-full justify-between" href={`/${locale}/Exhibition/Booth`} >
                    <p className="flex flex-row gap-x-4">
                        <IoBusiness className="text-lg text-blue-900" />
                        {t.booth_builders}
                    </p>
                    <IoIosArrowBack className={`text-lg text-blue-900 ${locale == 'fa' || locale == "ar" ? "rotate-0" : 'rotate-180'}`} />
                </Link>
                <Link className="text-sm flex flex-row  items-center px-2 border-b-[1px] border-neutral-300 py-1.5 w-full justify-between" href={`/${locale}/Exhibition/History`} >
                    <p className="flex flex-row gap-x-4">
                        <MdDateRange className="text-lg text-blue-900" />
                        {t.exhibition_history}
                    </p>
                    <IoIosArrowBack className={`text-lg text-blue-900 ${locale == 'fa' || locale == "ar" ? "rotate-0" : 'rotate-180'}`} />
                </Link>
                <Link className="text-sm flex flex-row  items-center px-2 py-1.5 w-full justify-between" href={`/${locale}/News`} >
                    <p className="flex flex-row gap-x-4">
                        <BsClipboard2Fill className="text-lg text-blue-900" />
                        {t.news}
                    </p>
                    <IoIosArrowBack className={`text-lg text-blue-900 ${locale == 'fa' || locale == "ar" ? "rotate-0" : 'rotate-180'}`} />
                </Link>
            </div>
        </div>
    );
}