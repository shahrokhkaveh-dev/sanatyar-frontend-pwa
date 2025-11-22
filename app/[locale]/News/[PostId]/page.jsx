import { api } from "@/config/api";
import HeaderItems from "@/components/layout/HeaderItems";
import Image from "next/image";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { PostId, locale } = await params;
    const t = loadTranslation(locale, 'news');

    const res = await api.get(`https://mag.sanatyariran.com/api/post/${PostId}`)
    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems href={`/${locale}/News`} title={t.title} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }

    return (
        <div>
            <HeaderItems href={`/${locale}/News`} title={t.title} />
            <Image quality={100} className="h-56 w-full" alt="blog" src={res.data.blog.image} width={300} height={300} />

            <div className="bg-white rounded-md w-[97%] mt-3 py-3 px-2 mx-auto">
                <p className="text-blue-900 text-sm text-center text-nowrap truncate">{res.data.blog.name}</p>
                <p className="text-xs mt-6">{res.data.blog.short_description}</p>
            </div>
        </div>
    );
}