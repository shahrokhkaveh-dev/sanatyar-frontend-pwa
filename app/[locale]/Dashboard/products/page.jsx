
import { getProductLinks } from "@/constans/Links";
import Link from "next/link";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'dashboard');

    const productLinks = getProductLinks(t);

    return (
        <div className="bg-white min-h-screen ">
            {productLinks.map((link, index) => (
                <Link key={index} href={`/${locale}${link.href}`} className="flex items-center gap-x-2 p-2 py-1  rounded-lg mb-2 s border-b-[1px] border-neutral-200">
                    <link.icon className="text-blue-800 text-3xl" />
                    <span className="text-base font-bold">{link.title}</span>
                </Link>
            ))}
        </div>
    );
}