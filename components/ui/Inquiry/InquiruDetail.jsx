import HeaderItems from "@/components/layout/HeaderItems";
import { statusby } from "@/constans/status";
import Image from "next/image";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import Response from "./Response";

export default function InquiruDetail({ data, myproduct, t, locale }) {
    return (
        <div className="pb-2">
            <HeaderItems href={`/${locale}/Inquiry`} title={t.title} />
            <Image className="w-full h-64 object-cover p-12 bg-white" alt="product_image" src={`${process.env.NEXT_PUBLIC_BASE_IMAGE}${data.product_image}`} width={800} height={300} />
            <div className="p-2 px-3 bg-blue-900 text-white flex flex-row justify-between  text-base font-bold">
                <p>{data.product_name}</p>
                <p>{data.number}{data.unit}</p>
            </div>
            <div className="mt-2 bg-white border-[1px] border-blue-900 text-sm px-2 py-3.5 w-[95%] mx-auto rounded-lg flex flex-col gap-y-3 font-bold">
                <p className="flex flex-row-reverse gap-x-1 w-full text-right font-bold">
                    <FaCalendarAlt className="text-blue-900 " />
                    {data.created_at}
                </p>
                <p className="flex flex-row gap-x-1 w-full">
                    <IoBusiness className="text-blue-900 text-base" />
                    {data.brand_name}
                </p>

                <p className="flex flex-row gap-x-1 w-full items-center ">
                    <FaUser className="text-blue-900 text-sm" />
                    {data.author}
                </p>
            </div>
            <p className="text-base font-semibold mt-3.5 px-3">{t.response_title}: </p>
            <div className="bg-green-100 border-[1px] border-blue-900 text-sm font-bold px-2 py-3.5 w-[95%] mx-auto rounded-lg flex flex-col gap-y-3 mt-1">
                <p className={`${data.status == 2 ? "text-green-700" : data.status == 3 ? 'text-red-600' : "text-blue-900"}`}>{t.request_status}: {statusby[data.status]}</p>
                {data.status !== 1 && <p>{t.response_date}: {data.created_at}</p>}
                {data.amount && <p className="font-semibold">{t.response_amount}: {data.amount} {data.currency}</p>}
                {data.response_description && <p>{data.response_description}</p>}
            </div>
            {myproduct && data.status == 1 && <Response id={data.id} />}
        </div>
    );
}