import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import Image from "next/image";
import { TbCategoryFilled } from "react-icons/tb";
import { ImOffice } from "react-icons/im";
import Link from "next/link";
import Inquiry from "@/components/ui/products/Inquiry";
import AddBookmark from "@/components/ui/products/AddBookmark";
import Location from "@/components/ui/products/Location";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { slug, locale } = await params;
    const t = loadTranslation(locale, 'products');

    const res = await api.get(`/application/product?slug=${slug}`).catch((err) => servError(err))

    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }

    return (
        <div className=" pb-4 mih-h-screen">
            <Image className="w-full h-64" width={1000} height={1000} alt={t.product_image_alt} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${res.data.response.image}`} />
            <div className="bg-blue-800 w-full p-2">
                <AddBookmark wishlist={res.data.response.wishlist} id={res.data.response.id} />
            </div>
            <div className="p-2 flex flex-row items-center justify-between gap-x-1">
                <p className="text-base font-bold text-blue-900">{res.data.response.name}</p>
                <Inquiry locale={locale} t={t} data={res.data.response} />
            </div>
            <div className="p-2 bg-white rounded-lg">
                {res.data.response.description ?
                    <div id="desc" className="text-xs p-2  overflow-x-auto"
                        dangerouslySetInnerHTML={{
                            __html: res.data.response.description
                        }} // Use the description from the data prop
                    /> :
                    <p className="text-base font-bold">{t.no_description}</p>
                }
            </div>
            {res.data.response.attributes.length > 0 &&
                <div>
                    <p className="text-sm font-bold mt-3 mb-1.5 ">{t.product_features}</p>
                    <ul className="bg-white text-sm">
                        {res.data.response.attributes.map((i, index) => (
                            <li className="my-0.5 border-b-[1px] border-neutral-200 px-1 py-0.5 flex flex-row rounded-md text-neutral-400 font-semibold" key={index}>
                                <span className="w-40">{i.name}</span>
                                <span >{i.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <div className="flex flex-row gap-x-1.5 py-3 justify-center">
                <Link href={`/${locale}/Products?category=${res.data.response.category_id}`} className="bg-white relative flex flex-col rounded-lg justify-center min-h-[70px] w-24 items-center overflow-hidden px-0.5 py-1">
                    <TbCategoryFilled className="text-4xl text-orange-400" />
                    <p className="text-sm text-blue-900 mt-1.5">{res.data.response.category}</p>
                    <div className="w-[79px]  h-[31px] absolute bg-blue-800 top-0 -right-10 rotate-45"></div>
                </Link>
                <Link href={`/${locale}/Brand/${res.data.response.brand_slug}`} className="bg-white relative flex flex-col rounded-lg justify-center min-h-[70px] w-24 items-center overflow-hidden px-1">
                    <ImOffice className="text-4xl text-orange-400 py-1" />
                    <p className="text-sm font-bold text-blue-900 mt-1.5">{res.data.response.brand}</p>
                    <div className="w-[79px]  h-[31px] absolute bg-blue-800 top-0 -right-10 rotate-45"></div>
                </Link>

                <Location locale={locale} t={t} data={res.data.response} />


            </div>
        </div>
    );
}