
import HeaderItems from "@/components/layout/HeaderItems";
import { api } from "@/config/api";
import Image from "next/image";
import Link from "next/link";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'news');

    let res;
    try {
        res = await api.get('https://mag.sanatyariran.com/api/posts');
    } catch (err) {
        return (
            <div>
                <HeaderItems title={t.title} href={`/${locale}`} />
                <p className="errortag">{t.error_message}</p>
            </div>
        );
    }
    return (
        <div>
            <HeaderItems title={t.title} href={`/${locale}`} />
            <div className="px-1.5 flex flex-col gap-y-2 pb-2 mt-2">
                {res.data.blogs.data.map((i) => (
                    <Link href={`/${locale}/News/${i.id}`} className="bg-white overflow-hidden rounded-md" key={i.id}>
                        <Image quality={100} className="w-full" alt="blog" src={i.image} width={300} height={300} />
                        <p className="text-nowrap truncate p-1 text-xs ">{i.name}</p>
                    </Link >
                ))}
            </div>
        </div>
    );
}