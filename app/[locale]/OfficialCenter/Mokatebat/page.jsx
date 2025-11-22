import HeaderItems from "@/components/layout/HeaderItems";
import { OfficialCenter } from "@/constans/OfficialCenter";
import Image from "next/image";
import Link from "next/link";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'OfficialCenter');

    return (
        <div className="min-h-screen pb-2">
            <HeaderItems title={t.title} href={`/${locale}/OfficialCenter`} />
            <Image quality={100} alt="image" src={"/OfficialCenters/marakez.jpg"} className="w-full max-h-96 " width={1000} height={1000} />
            {OfficialCenter.map((item, index) => (
                <Link href={`/${locale}/OfficialCenter/Mokatebat/${item.category}`} className="flex flex-row items-center gap-x-4 bg-white p-3 rounded-lg my-4 mx-2.5 border-[1px] border-blue-800" key={index}>
                    <Image quality={100} alt={item.name} src={item.image} width={70} height={70} className="rounded-md" />
                    <p className="font-black text-sm">{item.name}</p>
                </Link>
            ))}
        </div>
    );
}