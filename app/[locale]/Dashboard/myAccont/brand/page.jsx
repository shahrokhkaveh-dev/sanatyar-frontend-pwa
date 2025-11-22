import { api } from "@/config/api";
import { servError } from "@/util/Errorhadnler";
import Options from "@/components/ui/brand/Options";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPhone } from "react-icons/fa";
import NewsSlider from "@/components/ui/News/NewsSlider";
import Map from "@/components/ui/brand/Map";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {
    const { locale } = params;
    const t = await loadTranslation(locale, 'myAccont');

    const res = await api.get('application/panel/brand').catch(err => servError(err))

    if (res.error || !res.data.flag) {
        return <p className="errortag">{res.error ? res.error : res.data.message}</p>
    }


    return (
        <>
            <div className={`flex flex-row bg-blue-900 gap-x-2 w-full px-2 pt-5 py-3 min-h-[125px] items-center `}>

                <Image quality={100} className="bg-white-w-[100px] rounded-md h-full " width={100} height={100} alt="profile" src={res.data.response.brand.logo_path ? `https://app.sanatyariran.com/${res.data.response.brand.logo_path}` : '/profile.png'} />

                <div className="flex flex-col gap-y-2 h-full relative w-full">
                    {res.data.response.brand.name && <p className="text-lg  text-white font-semibold ">
                        {res.data.response.brand.name}
                    </p>
                    }
                    <div className="text-xs text-white flex flex-row justify-between items-end">
                        <p className="font-bold">{res.data.response.brand.category_name && res.data.response.brand.category_name}</p>

                        <div className="relative">
                            <input className="peer hidden" type="checkbox" id="options" />
                            <label htmlFor="options" className="cursor-pointer">
                                <SlOptionsVertical className="text-white text-lg" />
                            </label>
                            <Options t={t} />

                        </div>
                    </div>
                    <div className="flex flex-row gap-x-2 text-xs text-white mt-1">
                        <a href="/" className="bg-white rounded-md text-blue-900 px-2 py-1 text-center" >{t?.contact || "تماس"}</a>
                        <Map lat={res.data.response.brand.lat} lng={res.data.response.brand.lng} t={t} />
                    </div>
                </div>

            </div>
            <div className="px-2 min-h-screen pb-9">

                <div className="flex flex-row gap-x-2.5 bg-green-100 py-2 border-[1px] border-blue-800 rounded-lg px-2 mt-1  ">
                    {res.data.response.brand.managment_profile_path && <Image className="w-12 h-12 rounded-full" alt="profile" width={100} height={100} src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${res.data.response.brand.managment_profile_path}`} />}
                    <div className="flex flex-row justify-between items-center w-full pl-1.5">
                        <div >
                            {res.data.response.brand.managment_name && <p className="text-lg font-extrabold">{t?.ceo}: <span className="text-blue-800">{res.data.response.brand.managment_name}</span></p>}
                            {res.data.response.brand.managment_number && <p className="text-lg font-extrabold mt-2 flex flex-row gap-x-1.5">{t?.contact_number}: <span className="text-blue-800 flex flex-row gap-x-2.5">{res.data.response.brand.managment_number}
                                <a href={`tel:${res.data.response.brand.managment_number}`}>
                                    <FaPhone className="bg-green-500 text-white rounded-full p-1.5 text-3xl" />
                                </a>
                            </span></p>}
                        </div>

                    </div>
                </div>
                <p className="text-xs mt-3 mb-1 px-1.5">{t?.company_information || "اطلاعات شرکت"}</p>
                <div className="bg-white rounded-lg p-2 border-[1px] border-neutral-400 text-base font-bold flex flex-col gap-y-2">
                    {res.data.response.brand.category_name && <p>{t?.activity_area || "حوزه فعالیت"}: {res.data.response.brand.category_name}</p>}
                    {res.data.response.brand.phone_number && <p>{t?.company_phone || "شماره تماس"}: {res.data.response.brand.phone_number}</p>}
                    {res.data.response.brand.address && <p>{t?.company_address || "نشانی"}: {res.data.response.brand.address}</p>}
                </div>
                <p className="text-xs mt-3 mb-1 px-1.5">{t?.about_company || "درباره شرکت"}</p>
                <div className="p-2 bg-white border-[1px] border-neutral-400 rounded-lg">
                    {res.data.response.brand.description ?
                        <div id="desc" className="font-bold p-2  overflow-x-auto"
                            dangerouslySetInnerHTML={{
                                __html: res.data.response.brand.description
                            }} // Use the description from the data prop
                        /> :
                        <p className="text-xs">{t?.no_company_description || "توضیحاتی برای این شرکت ثبت نشده"}</p>
                    }
                </div>
                <p className="text-xs mt-3 mb-1 px-1.5">{t?.company_images_title || "تصاویر"}</p>
                <NewsSlider data={res.data.response.images} />

            </div>
        </>
    );
}