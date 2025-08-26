import { RiAddBoxFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { api } from "@/config/api";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import DeleteBtn from "@/components/ui/products/DeleteBtn";
import HeaderItems from "@/components/layout/HeaderItems";
import { loadTranslation } from "@/util/translations";

export default async function ({ params }) {
    const { locale } = await params;
    const t = loadTranslation(locale, 'myProducts');
    const res = await api.get('application/panel/products')

    if (res.error || !res.data.flag) {
        return (
            <div>
                <HeaderItems href={'/Dashboard/products'} title={t.title} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }

    return (
        <div>
            <HeaderItems href={'/Dashboard/products'} title={t.title} />
            <Link href={'/Dashboard/products/myProducts/Add'} className="text-xs flex items-center gap-x-2 p-2 py-2 my-1.5 bg-neutral-100  mt-3 justify-between">
                <span className="flex items-center gap-x-2 text-lg font-bold ">
                    <RiAddBoxFill className="text-3xl text-blue-800" />
                    {t.add_product}
                </span>
                <IoIosArrowBack className="text-2xl text-neutral-700" />
            </Link>
            <div className="grid grid-cols-2 gap-2 px-2 pb-12 mt-3">
                {res.data.response.products.map((i) => (

                    <div key={i.id} className="w-full py-2.5 pb-1 rounded-md flex flex-col bg-white">
                        <input type="checkbox" id={`del${i.id}`} name={`del${i.id}`} className="peer hidden" />
                        <Link href={`/Products/${i.slug}`} >
                            <Image className="w-full h-36" alt="product" width={200} height={200} src={`https://app.sanatyariran.com/${i.image}`} />
                        </Link>
                        <div className="flex flex-row py-4 mt-2.5">
                            <Link href={`/Products/${i.slug}`} className="text-sm w-full truncate text-center font-bold">{i.name}</Link>
                            <div className="relative">
                                <input id={i.id} type="checkbox" className="peer hidden" />
                                <label htmlFor={i.id} className="text-orange-400 text-2xl "><SlOptionsVertical /> </label>
                                <div className="transition-all duration-100 ease-in-out absolute bg-white text-xs -bottom-12 opacity-0 peer-checked:opacity-100  scale-0 peer-checked:scale-100 p-1 rounded-md border-blue-900 border-[1px] mt-3.5 left-0 text-nowrap w-fit">
                                    <Link href={`/Dashboard/products/myProducts/Edit/${i.id}`} className="mb-1 flex flex-row-reverse items-center gap-x-1">{t.edit_product}<MdEditDocument className="text-blue-800 text-sm" /></Link>
                                    <label htmlFor={`del${i.id}`} className="mb-1 flex flex-row items-center gap-x-1 text-right">
                                        <MdDeleteForever className="text-red-500 text-base" />
                                        {t.delete_product}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <DeleteBtn locale={locale} t={t} id={i.id} />
                    </div>


                ))}
            </div>
        </div>
    );
}