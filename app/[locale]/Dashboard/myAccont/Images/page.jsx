import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import HeaderItems from "@/components/layout/HeaderItems";
import AddImage from "@/components/ui/Image/AddImage";
import AddLogo from "@/components/ui/Image/AddLogo";
import DelImage from "@/components/ui/Image/DelImage";
import Image from "next/image";
import { Fragment } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = params;
    const t = await loadTranslation(locale, 'myAccont');

    const res = await api.get('application/panel/brand').catch((err) => servError(err))


    if (res.error || (res.data && !res.data.flag)) {
        return (
            <div>
                <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.company_images} />
                <p className="errortag">{res.error ? res.error : res.data.message}</p>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen pb-2">
                <div className="sticky top-0 bg-neutral-200 pb-1 z-10">
                    <HeaderItems href={`/${locale}/Dashboard/myAccont`} title={t.company_images} />
                    <div className="flex flex-row bg-white items-center text-base font-bold text-blue-800 gap-x-2 px-3 py-2 ">
                        {res.data.response.brand.logo_path && <Image className="w-24 h-20 rounded-md" alt="image" width={200} height={200} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${res.data.response.brand.logo_path}`} />}
                        <label htmlFor="logo">{res.data.response.brand.logo_path ? t.change_company_logo : t.add_company_logo}</label>
                        <AddLogo t={t} />
                    </div>
                    <p className="text-orange-400 px-2.5 text-sm mt-2 pt-2 ">{t.image_gallery}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-1">
                    {res.data.response.images.map((i, index) => (
                        <Fragment key={index}>
                            <input name={i} id={i} type="checkbox" className="hidden peer" />
                            <label htmlFor={i} className="bg-white rounded-lg  p-0.5 flex flex-col h-full ">
                                <Image quality={100} className="w-full h-[150px] rounded-t-lg" alt="image" width={1000} height={1000} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image_path}`} />
                                <div className="flex flex-row justify-end p-1">
                                    <p className="text-sm font-bold">{i.title}</p>
                                    <DelImage image={i.image_path} t={t} />
                                </div>
                            </label>
                            <div className="fixed top-0 right-0 w-full h-full  bg-neutral-200 hidden flex-col justify-between   peer-checked:flex z-50  p-1">
                                <label className="p-2 text-2xl text-red-600" htmlFor={i}><IoCloseSharp /></label>
                                <Image quality={100} className="w-full h-2/3" alt="image" width={1000} height={1000} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image_path}`} />
                                <div className="text-white min-h-14 backdrop-brightness-50 mt-3">
                                    <p >{i.title}</p>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>

            <AddImage t={t} />

        </>
    );
}