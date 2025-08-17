import { api } from "@/config/api";

import ShowLocation from "@/components/ui/brand/ShowLocation";
import Image from "next/image";
import Link from "next/link";
import BrandSlider from "@/components/ui/brand/Slider";
import { loadTranslation } from "@/util/translations";

export default async function page({ params }) {

    const { slug, locale } = await params

    const t = loadTranslation(locale, 'brands')

    const res = await api.get(`/application/brand?slug=${slug}`)


    return (
        <div className="min-h-screen pb-3">
            <div className="bg-blue-900 flex flex-row gap-x-2.5 px-4 items-center justify-center py-5">
                <div className="w-32 rounded-md overflow-hidden aspect-square ">
                    <Image className="w-full h-full" width={1000} height={1000} alt="logo" src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${res.data.response.brand.logo_path}`} />
                </div>
                <div className="w-full h-full text-white flex flex-col gap-y-2">
                    <p className="text-base font-bold text-white">{res.data.response.brand.name}</p>
                    <p className="text-sm ">{res.data.response.brand.category}</p>
                    <div className="grid grid-cols-3 w-fit text-blue-800 text-base font-bold gap-x-2">
                        <a className="bg-white  px-3 rounded-md py-1" href={`tel:${res.data.response.brand.phone_number}`}>{t.call}</a>
                        <Link className="w-full bg-white rounded-md text-center py-1" href={`/${locale}/AutomationSystem/Send?company=${res.data.response.brand.name}`}>{t.contact}</Link>
                        <ShowLocation t={t} lat={res.data.response.brand.lng} lng={res.data.response.brand.lng} />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-4 gap-x-1.5 items-center justify-center py-2 px-2 font-bold">
                <div className="w-full h-16 rounded-md border-[1px] border-blue-900 bg-white flex flex-col justify-around py-1 items-center  font-bold">
                    <p className="text-sm">{res.data.response.brand.product_count}</p>
                    <p className="text-xs">{t.products}</p>
                </div>
                <div className="w-ful  h-16 rounded-md border-[1px] border-blue-900 bg-white flex flex-col justify-around py-1 items-center ">
                    <p className="text-sm">{res.data.response.brand.inquiry_count}</p>
                    <p className="text-xs">{t.inquiry}</p>
                </div>
                <div className="w-ful  h-16 rounded-md border-[1px] border-blue-900 bg-white flex flex-col justify-around py-1 items-center ">
                    <p className="text-xs ">{res.data.response.brand.with_us}</p>
                    <p className="text-xs">{t.membership}</p>
                </div>
                <div className="w-full  h-16 rounded-md border-[1px] border-blue-900 bg-white flex flex-col justify-around py-1 items-center ">
                    <p className="text-sm">{res.data.response.images.length > 0 ? res.data.response.images.length + 1 : 0}</p>
                    <p className="text-xs">{t.images}</p>
                </div>
            </div>
            <div className=" px-2">
                <p className="text-sm mt-3 mb-1">{t.company_information}</p>
                <div className="bg-white rounded-md p-2.5 border-[1px] border-blue-900 text-base font-bold flex flex-col gap-2.5">
                    <p>{t.activity_area}: {res.data.response.brand.category}</p>
                    <p>{t.phone_number}: {res.data.response.brand.phone_number}</p>
                    <p>{t.address}: {res.data.response.brand.address}</p>
                </div>
                <p className="text-sm mt-3 mb-1">{t.about_company}</p>
                <div className="bg-white rounded-md p-2.5 border-[1px] border-blue-900">
                    {res.data.response.brand.description ?
                        <div id="desc" className="text-sm p-1  "
                            dangerouslySetInnerHTML={{
                                __html: res.data.response.brand.description
                            }} // Use the description from the data prop
                        /> :
                        <p className="text-base font-bold">{t.no_description}</p>
                    }
                </div>
            </div>
            <p className="text-sm mt-3 mb-1 px-2">{t.products}</p>
            <div className="w-full overflow-auto ">
                <div className="flex flex-row  flex-nowrap w-fit gap-2 px-1">
                    {res.data.response.products.map((i) => (
                        <Link
                            href={`/Products/${i.slug}`}
                            key={i.id}
                            className="bg-white flex flex-col rounded-md overflow-hidden w-40 h-36"
                        >
                            <div className="flex-grow relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${i.image}`}
                                    alt="product"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-nowrap truncate text-sm py-2 px-2 font-bold">{i.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
            {res.data.response.images.length > 0 &&
                <>
                    <p className="text-xs mt-3 mb-1 px-1.5">{t.images}</p>
                    <BrandSlider data={res.data.response.images} />
                </>
            }

        </div>
    );
}

//    <div className="bg-blue-800  pr-4 pl-1 min-h-40 ">
//         <div className="flex flex-row justify-between items-center ">
//             <div className={`flex flex-row w-full items-start gap-x-2 h-full`}>
//                 <div className="w-20 h-full">
//                     <Image className="bg-white w-full rounded-md  min-h-20 object-fill" width={300} height={300} alt="profile" src={res.data.response.brand.logo_path ? `https://app.sanatyariran.com/${res.data.response.brand.logo_path}` : '/profile.png'} />
//                 </div>
//                 <div className="py-2 relative text-white ">
//                     <p className="text-lg  text-white font-bold text-nowrap">{res.data.response.brand.name}</p>
//                     <p className="mt-3 text-sm">{res.data.response.brand.category}</p>
//                     <div className="flex flex-row w-full absolute gap-x-2 mt-2">

//                         <a href={`tel:${res.data.response.brand.phone_number}`} className="bg-white h-fit text-blue-900 px-1  py-1 rounded-md">تماس</a>
//                         <Link href={`/AutomationSystem/Send?company=${res.data.response.brand.name}`} className="bg-white h-fit text-blue-900 px-2 py-1 rounded-md">مکاتبه</Link>
//                         <ShowLocation lat={res.data.response.brand.lng} lng={res.data.response.brand.lng} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>